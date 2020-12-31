
 const baseUrl="https://api.open5e.com/spells/";
/* --------------------Inital declarations------------------------*/
//const baseUrl="https://www.dnd5eapi.co/api/spells/";
const inputFld=document.querySelector("#Inputfield");
const Qarea=document.querySelector("#QueryArea");
const mainRegex=/\s+/g;
const UpperCaseRegex=/[A-Z]/g;


/* --------------------Error displaying function------------------------*/
const displayError = (error) =>{
    console.log('aaaaaaaaaaaaaaaaaaaaaaa');
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

/* --------------------function for api call------------------------*/
const GetSpellFncStart = async () =>{
    let wordQuery=`${baseUrl}${(inputFld.value).trim()}`;
    let ordQuery=wordQuery.replace(mainRegex,"-");
    wordQuery=ordQuery.replace(UpperCaseRegex,(match)=> {return match.toLowerCase()});
   
    try{
        const response = await fetch(wordQuery);
        if(response.status==200){
            const jsonResponse = await response.json();
            document.querySelector("#QueryArea").scrollIntoView({behavior:"smooth"});
            renderResponse(jsonResponse);
        }
        else{
            document.querySelector("#QueryArea").scrollIntoView({behavior:"smooth"});
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
            for(let propy in res){
                if(res[propy]==""){
                    res[propy]="None";
                }
            };
            Qarea.innerHTML= `<ul>
                                <li><span>Name:</span>${res.name}</li>
                                <li><span>Description:</span>${res.desc}</li>
                                <li><span>Higher Level:</span>${res.higher_level}</li>
                                <li><span>Range:</span>${res.range}</li>
                                <li><span>Components:</span>${res.components}</li>
                                <li><span>Material:</span>${res.material}</li>
                                <li><span>Ritual:</span>${res.ritual}</li>
                                <li><span>Duration:</span>${res.duration}</li>
                                <li><span>Concentration:</span>${res.concentration}</li>
                                <li><span>Casting Time:</span>${res.casting_time}</li>
                                <li><span>Level:</span>${res.level}</li>
                                <li><span>School:</span>${res.school}</li>
                                <li><span>Class:</span>${res.dnd_class}</li>
                            </ul>`;
        }
    }
    catch(error){
        displayError(error);
    }
}

document.addEventListener('submit',GetSpellFnc);