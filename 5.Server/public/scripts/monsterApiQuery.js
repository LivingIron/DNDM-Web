
/* --------------------Inital declarations------------------------*/
//const baseUrl="https://www.dnd5eapi.co/api/spells/";
const baseUrl="https://api.open5e.com/monsters/";
const inputFld=document.querySelector("#Inputfield");
const Qarea=document.querySelector("#QueryAreaMonsters");
const mainRegex=/\s+/g;
const UpperCaseRegex=/[A-Z]/g;


/* --------------------Error displaying function------------------------*/
const displayError = (error) =>{
    console.log(error);
    Qarea.innerHTML=`<h4>Error! Looks like something went wrong !</h4><br><h5>Check your internet connection and try a new monster!</h5>`;
}

/* --------------------Clears last result and calls the api function------------------------*/
const GetSpellFnc =(event) =>{
    event.preventDefault();
    while(Qarea.firstChild){
        Qarea.removeChild(Qarea.firstChild);
    }
    GetSpellFncStart();
}

/* --------------------function for api call------------------------*/
const GetSpellFncStart = async () =>{
    let wordQuery=`${baseUrl}${(inputFld.value).trim()}`;
    let ordQuery=wordQuery.replace(mainRegex,"-");
    wordQuery=ordQuery.replace(UpperCaseRegex,(match)=> {return match.toLowerCase()});
   
    try{
        const response = await fetch(wordQuery);
        if(response.status==200){
            const jsonResponse = await response.json();
            document.querySelector("#QueryAreaMonsters").scrollIntoView({behavior:"smooth"});
            renderResponse(jsonResponse);
        }
        else{
            document.querySelector("#QueryAreaMonsters").scrollIntoView({behavior:"smooth"});
            throw new Error(response);
        }
    }
    catch(error){
        displayError(error);
    }

}

/* --------------------Function for displaying the information from the GET Request------------------------*/
const renderResponse = (res) =>{
    try{
        if(!res){
            throw new Error(res);
        }
        else{

            JSON.stringify(res);
            for(let property in res){
                if(res[property]=="" ||res[property]==null ){
                    res[property]="None";
                }
            }

    //For displaying the speed of the monster

            let displaySpeed=new (Array);
            for(const propy in res.speed){
                displaySpeed.push(`${propy}: ${res.speed[propy]}ft`);
            }
            displaySpeed.join(' ');

    //For displaying the Skills of the monster

            let displaySkills=new (Array);
            for(const propy in res.skills){
                displaySkills.push(`${propy}: +${res.skills[propy]}`);
            }
            displaySkills.join(' ');

    //For displaying the special abilities of the monster   
            let displaySpecialAbilities=new(Array);
            if(res.special_abilities!='' && res.special_abilities!=null){
                let i=0;
                res.special_abilities.forEach((name,desc)=>{
                    //console.log(res.special_abilities[i].name);
                    displaySpecialAbilities.push("<li><span>"+res.special_abilities[i].name+":</span>"+res.special_abilities[i].desc+"</li>");
                    i++;
                });

            } 
            let StrDisplaySpecialAbilities=displaySpecialAbilities.join(' ');
            //console.log(StrDisplaySpecialAbilities);   
            
    //For displaying the Actions of the monster   
            let displayActions=new(Array);
            if(res.actions!='' && res.actions!=null){
                let i=0;
                res.actions.forEach((name,desc)=>{
                    displayActions.push("<li><span>"+res.actions[i].name+":</span>"+res.actions[i].desc+"</li>");
                    i++;
                });
            }
            let StrDisplayActions=displayActions.join(' ');

    //For displaying the Legendary Actions of the monster   
            let DisplayLegendaryActions=new (Array);

            if(res.legendary_actions!="" && res.legendary_actions!=null && res.legendary_actions!="None"){
                console.log(res.legendary_actions);
                let i=0;
                DisplayLegendaryActions.push("<hr><li><span>Legendary Actions:</span></li>");
                res.legendary_actions.forEach((name,desc)=>{
                    DisplayLegendaryActions.push("<li><span>"+res.legendary_actions[i].name+":</span>"+res.legendary_actions[i].desc+"</li>");
                    i++;
                });
            }
            let StrDisplayLegendaryActions=DisplayLegendaryActions.join(' ');

            Qarea.innerHTML=(`
                    <ul>
                        <li><span>Name:</span>${res.name}<span>Challenge Rating:</span>${res.challenge_rating}</li>
                        <li><span>Size:</span>${res.size}<span>Type:</span>${res.type}<span>Subtype:</span>${res.subtype}<span>Alignment:</span>${res.alignment}</li>
                        <hr>
                        <li><span>Armor Class:</span>${res.armor_class}<span>HP:</span>${res.hit_points}(${res.hit_dice})<span>Speed:</span>${displaySpeed}</li>
                        <li><span>STR:</span>${res.strength}<span>DEX:</span>${res.dexterity}<span>CON:</span>${res.constitution}<span>INT:</span>${res.intelligence}<span>WIS:</span>${res.wisdom}<span>CHAR:</span>${res.charisma}</li>
                        <li><span>STR Save:</span>${res.strength_save}<span>DEX Save:</span>${res.dexterity_save}<span>CON Save:</span>${res.constitution_save}<span>INT Save:</span>${res.intelligence_save}<span>WIS Save:</span>${res.wisdom_save}<span>CHAR Save:</span>${res.charisma_save}</li>
                        <hr>
                        <li><span>Skills:</span>${displaySkills}<span>Senses:</span>${res.senses}<span>Languages:</span>${res.languages}</li>
                        <li><span>Vulnerabilities:</span>${res.damage_vulnerabilities}<span>Resistances:</span>${res.damage_resistances}<span>Immunities:</span>${res.damage_immunities}<span>Condition Immunities:</span>${res.condition_immunities}</li>
                        <hr>
                        ${StrDisplaySpecialAbilities}
                    </ul> 
                    <ol>
                        <li><span>Actions:</span></li>
                        <hr>
                        ${StrDisplayActions}
                        ${StrDisplayLegendaryActions}
                    </ol>
                  `)
                    ;
                //<li><a href="https://www.dandwiki.com/wiki/5e_SRD:Monsters">For the full monster block click this link</a></li>
            }
            
    }
    catch(error){
        displayError(error);
    }
}

document.addEventListener('submit',GetSpellFnc);