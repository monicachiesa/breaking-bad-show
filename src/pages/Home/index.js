import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom'
import './home.css'

function Home() {

    const [personagens, setPersonagens] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadPersonagens() {
            const response = await api.get("/characters");
            console.log("response.data", response.data)
            setPersonagens(response.data.slice(0, 10));

            console.log("personagem", personagens);
            setLoading(false);
        }

        loadPersonagens();
    }, [])

function pesquisarPersonagem(){

}

    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando personagens...</h2>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="lista-personagens">
                {personagens.map((personagem) => {
                    return (
                        <article key={personagem.char_id}>
                            <strong>{personagem.name}</strong>
                            <img src={personagem.img} alt={personagem.name} />
                            <Link to={`/personagem/${personagem.char_id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;