/* --------------------Inital declarations------------------------*/
//const baseUrl="https://www.dnd5eapi.co/api/spells/";
const baseUrl="https://api.open5e.com/weapons/";
const secondUrl="https://api.open5e.com/magicitems/"
const inputFld=document.querySelector("#Inputfield");
const Qarea=document.querySelector("#QueryAreaEquipment");
const mainRegex=/\s+/g;
const UpperCaseRegex=/[A-Z]/g;


/* --------------------Error displaying function------------------------*/
const displayError = (error) =>{
    document.querySelector("#QueryAreaEquipment").scrollIntoView({behavior:"smooth"});
    console.log(error);
    Qarea.innerHTML=`<h4>Error! Looks like something went wrong !</h4><br><h5>Check your internet connection and try a new spell!</h5>`;
}

/* --------------------Clears last result and calls the api function------------------------*/
const GetSpellFnc =(event) =>{
    event.preventDefault();
    while(Qarea.firstChild){
        Qarea.removeChild(Qarea.firstChild);
    }
    GetSpellFncStart();
}

/* --------------------ASYNC function for api call------------------------*/
const GetSpellFncStart = async () =>{
    let wordQuery=`${baseUrl}${(inputFld.value).trim()}`;
    let secondWordQuery=`${secondUrl}${(inputFld.value).trim()}`;
    let ordQuery=wordQuery.replace(mainRegex,"-");
    let SOrdQuery=secondWordQuery.replace(mainRegex,"-");
    wordQuery=ordQuery.replace(UpperCaseRegex,(match)=> {return match.toLowerCase()});
    secondWordQuery=SOrdQuery.replace(UpperCaseRegex,(match)=>{return match.toLocaleLowerCase()});

    try{
        const response = await fetch(wordQuery);
        
        if(response.status==200){
            const jsonResponse = await response.json();
            document.querySelector("#QueryAreaEquipment").scrollIntoView({behavior:"smooth"});
            renderResponse(jsonResponse);
        }
        else{

            const secondResponse=await fetch(secondWordQuery);
            if(secondResponse.status==200){
                const secondJsonResponse=await secondResponse.json();
                document.querySelector("#QueryAreaEquipment").scrollIntoView({behavior:"smooth"});
                renderSecondResponse(secondJsonResponse);
            }
            else{
                throw new Error(secondResponse);
            }
        }
    }
    catch(error){
        displayError(error);
    }

}

/* --------------------Function for displaying the information from the first GET Request------------------------*/
const renderResponse = (res) =>{
    try{
        
        if(!res){
            throw new Error(res);
        }
        else{
            JSON.stringify(res);
            for(let propy in res){
                if(res[propy]==""){
                    res[propy]="None";
                }
            }

            let StrWeaponProperties=' ';
            if(res.properties!='' && res.properties!=null && res.properties!='None'){
                let weaponProperties=new(Array);
                let i=0;
                weaponProperties.push(`<li><span>Properties:</span>`);
                res.properties.forEach((element) => {
                    weaponProperties.push(`, ${res.properties[i]}`);
                    i++;
                });
                weaponProperties.push(`</li>`);
                StrWeaponProperties=weaponProperties.join(' ');
                StrWeaponProperties=StrWeaponProperties.replace("," ," ");
            }
            

            Qarea.innerHTML= `<ul>
                                <li><span>Name:</span>${res.name}</li>
                                <li><span>Category:</span>${res.category}</li>
                                <li><span>Cost:</span>${res.cost}</li>
                                <li><span>Damage:</span>${res.damage_dice}</li>
                                <li><span>Damage Type:</span>${res.damage_type}</li>
                                <li><span>Weight:</span>${res.weight}</li>
                               ${StrWeaponProperties}
                            </ul>`;
        }
    }
    catch(error){
        displayError(error);
    }
}

/* --------------------Function for displaying the information from the SECOND GET Request------------------------*/
const renderSecondResponse = (res) =>{
    try{
        if(!res){
            throw new Error(res);
        }
        else{
            JSON.stringify(res);
            for(let propy in res){
                if(res[propy]==""){
                    res[propy]="None";
                }
            };

        //Dealing with deck of illusions/ deck of many things bug
            let lineIndex=res.desc.indexOf('|');
            res.desc=res.desc.substring(0,lineIndex !=-1 ? lineIndex : res.desc.length);

        //Dealing with the attunment text
            if(res.requires_attunement=="None" || res.requires_attunement!=null || res.requires_attunement!=" "){
                res.requires_attunement="does not require attunement"
            }

            Qarea.innerHTML= `<ul>
                                <li><span>Name:</span>${res.name}</li>
                                <li><span>Description:</span>${res.desc}</li>
                                <li><span>Type:</span>${res.type}</li>
                                <li><span>Rarity:</span>${res.rarity}</li>
                                <li><span>Attunement:</span>${res.requires_attunement}</li>
                            </ul>`;
        }
    }
    catch(error){
        displayError(error);
    }
}

document.addEventListener('submit',GetSpellFnc);