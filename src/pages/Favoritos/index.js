import './favoritos.css';
import { useEffect, useState, React } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

function Favoritos() {

    const [personagens, setPersonagens] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem("@breakingbad"); //pega a lista no localStorage

        setPersonagens(JSON.parse(minhaLista) || [])

    }, []);

    function excluirPersonagem(id) {
        let filtroPersonagens = personagens.filter((personagem) => {
            return (personagem.char_id !== id);  //devolve todos os personagens menos o que eu cliquei
        });
        setPersonagens(filtroPersonagens);
        localStorage.setItem("@breakingbad", JSON.stringify(filtroPersonagens));
        toast.success('Personagem removido com sucesso!');
    }


    return (
        <div className='meus-personagens'>
            {personagens.length === 0 && <span>Você não possui nenhum personagem salvo! :(</span>}
            <h2>Meus personagens salvos</h2>
            {personagens.map((personagem) => {
                return (
                    <Box key={personagem.char_id}>
                        <Grid className="box">
                            <List>
                                <ListItem className="list-item">
                                    <ListItemAvatar>
                                        <Avatar
                                            variant="rounded"
                                            src={personagem.img}
                                            sx={{ width: 75, height: 100 }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={personagem.name}
                                    />
                                    <Link to={`/personagem/${personagem.char_id}`}>Ver detalhes</Link>
                                    <button onClick={() => excluirPersonagem(personagem.char_id)}>Excluir</button>
                                </ListItem>
                            </List>
                        </Grid>
                    </Box>
                )
            })}</div>
    )
}
export default Favoritos;