import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import api from '../../services/api';
import './personagem-info.css'

function Personagem() {

    const { id } = useParams();  //pega o ID do personagem selecionado
    const [personagem, setPersonagem] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadPersonagem() {
            await api.get(`/characters/${id}`)
                .then((response) => {
                    setPersonagem(response.data[0]);
                    console.log("response.data", response.data[0])
                    console.log("personagem", personagem)
                    setLoading(false);
                })
                .catch(() => {
                    navigate("/", { replace: true});  //se não encontrar o personagem, 
                    //leva para a tela inicial
                    return;
                })
        }

        loadPersonagem();
        return () => {

        }
    }, [navigate, id])

    function salvarPersonagem() {
        const minhaLista = localStorage.getItem("@breakingbad");

        let personagemsSalvos = JSON.parse(minhaLista) || [];  //tenta buscar a lista, se não tiver nada cria um array vazio

        const hasPersonagem = personagemsSalvos.some((personagemSalvo) => personagemSalvo.id === personagem.char_id);  //verifica se pelo menos um item da lista e igual
    
    if (hasPersonagem) {
        toast.warn("Este personagem já está na sua lista!");
        return;
    } 

    personagemsSalvos.push(personagem); //adiciona ao array o personagem
    localStorage.setItem("@breakingbad", JSON.stringify(personagemsSalvos));
    toast.success("Personagem salvo com sucesso!");
    }

    if (loading) {
        return (
            <div className='personagem-info'>
                Carregando detalhes do personagem...
            </div>
        )
    }

    return (
        <div className='personagem-info'>
            <h1>{personagem.name}</h1>
            <img src={personagem.img} alt={personagem.name} />
            <h3>Aniversário</h3>
            <span>{personagem.birthday}</span>

            <h3>Profissão</h3>
            <span>{personagem.occupation}</span>

            <h3>Apelido</h3>
            <span>{personagem.nickname}</span>

            <div className="area-buttons">
                <button
                onClick={salvarPersonagem}
                >Salvar</button>               
            </div>
        </div>
    )
}

export default Personagem;