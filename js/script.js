import Etudiant from "./etudiants.js";
let filterBySettings = {
    'column':'id',
    'desc': false, 

}
const displayEtudiants = async function(){
    return Etudiant.alletudiants().then(function(response){

        response.sort((a,b)=>{
            const isNumber = typeof a[filterBySettings.column] ==='number'
            if(isNumber){
                if(filterBySettings.desc) {
                    return b[filterBySettings.column]-(a[filterBySettings.column])
                        }
                else{
                    return a[filterBySettings.column]-(b[filterBySettings.column])
                }
            }

            if(filterBySettings.desc) {
            return b[filterBySettings.column].localeCompare( a[filterBySettings.column])
                }
            return a[filterBySettings.column].localeCompare(b[filterBySettings.column])
 
    })

        return response.map((data)=>{
            const {id,name,date,note}=data
            const etudiant = new Etudiant(name,date,note)
            return `
                <tr>
                    <td>${id}</td>
                    <td>${etudiant.name}</td>
                    <td>${etudiant.getAge()}ans</td>
                    <td><span class="badge rounded-pill ${etudiant.isAdmited()?'text-bg-success':'text-bg-danger'}">${etudiant.note} / ${Etudiant.MAX_NOTE}</span></td>
                    <td><button class='btn btn-danger btn-sm delete'data-id ='${id}'>Supprimer</button></td>
                    
                </tr> `

        })
    })
}

const addEtudient =(event) => {
    event.preventDefault()
    const [nom,date,note] = document.querySelectorAll('#nom,#date,#note')
    const etudiant = new Etudiant(nom.value,date.value,note.value)
    etudiant.addEtudiant()
}

window.deleteEtudiant = (id) => {
    Etudiant.deleteEtudiant(id)
 }

const renderEtudiants = function(){
   const body = document.querySelector('.liste-etudiants')
   
    displayEtudiants().then((data) =>
    
    {body.innerHTML = data.join(' ')
        init()
    })
    
}

const init = function(){
    const refreshButton = document.querySelector('#refresh')
    const addButton = document.querySelector('#add')
    const deleHtmlteButtons = document.querySelectorAll('.delete')
    refreshButton.addEventListener('click',() =>{
        renderEtudiants()}
    )
    addButton.addEventListener('click',(event) =>{
        addEtudient(event)}
    )
    deleHtmlteButtons.forEach((button) => {
        button.addEventListener('click',()=>{
        
            window.deleteEtudiant(button.dataset.id)
        } )
        
    });
    
}

window.renderSort = (column)=> {

   
}

renderEtudiants() 


