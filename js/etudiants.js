import { ENDPOINT } from "./constant.js"

export default class Etudiant {
    static MAX_NOTE = 20
    constructor(name,age,note){
        this.name = name
        this.age= age
        this.note = note
    }

    getAge = () => ((new Date()).getUTCFullYear() - new Date(this.age).getFullYear())

    isAdmited = () => this.note >= 10

    static alletudiants = async function(){
        const response = await fetch(ENDPOINT)
        const etudiants = await response.json()
    
        return etudiants
    }

    addEtudiant = async function(){
        const response = await fetch(ENDPOINT,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                name: this.name,
                date: this.age,
                note: this.note
            })
        })
        
        return response
    }


    static deleteEtudiant = async function(id){
        const response = await fetch(ENDPOINT+'/'+id,{
            method: 'DELETE',
            headers: {'Content-Type':'application/json'}
        
        })
        
        return response
    }

}