import { useState, useEffect } from "react";
import ActionAreaCard from "../Components/Card";
import { getAllCharacters } from "../Service/Api";
import { Box, Modal, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Buttons from "../Components/Buttons";
import "../App.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
export default function Characters() {
  const [data, setData] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [info, setInfo] = useState(null);

  const apiUrl = "https://rickandmortyapi.com/api";

  const fetchMoreData = async (url) => {
    const response = await getAllCharacters(url);
    console.log(response);
    setData(response.results);
    setInfo(response.info);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllCharacters(`${apiUrl}/character`);
        console.log(response);
        setData(response.results);
        setInfo(response.info);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, []);

  const handleOpenModal = (character) => {
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  const CharacterModal = ({ character, open, onClose }) => {
    if (!character) return null;

    const boxProps = {
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      top: "10%",
      left: "35%",
      with: 200,
      bgcolor: "background.paper",
      borderRadius: 16,
      border: "3px solid #0000",
      boxShadow: 24,
      p: 4,
    };
    return (
      <Modal open={open} onClose={onClose}>
        <Box sx={boxProps}>
          <img
            className="img"
            src={character.image}
            width="100%"
            alt="not valid"
          />
          <Typography variant="h3" component="h3">
            {character.name}
          </Typography>
          <Typography sx={{ mt: 2 }}>Name: {character.name}</Typography>
          <Typography sx={{ mt: 2 }}>Status: {character.status}</Typography>
          <Typography sx={{ mt: 2 }}>Specie: {character.species}</Typography>
          <Typography sx={{ mt: 2 }}>Gender: {character.gender}</Typography>
          <Typography sx={{ mt: 2 }}>
            Origin: {character.origin.name}
          </Typography>
        </Box>
      </Modal>
    );
  };

  return (
    <div className="Header">
      <Buttons text="Home" route={"/"} />
      <h1>Api de Rick and Morty</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {data.map((element) => (
            <Grid key={element.id} size="auto">
              <Item>
                <ActionAreaCard
                  imagen={element.image}
                  titulo={element.name}
                  cuerpo={`Status: ${element.status} Especie: ${element.species}`}
                  onclick={() => handleOpenModal(element)}
                />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      <br />
      <div className="lista">
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={() => fetchMoreData(info.prev)}>
            Pagina Anterior
          </Button>
          <Button variant="contained" onClick={() => fetchMoreData(info.next)}>
            Pagina Siguiente
          </Button>
        </Stack>
      </div>
      <CharacterModal
        character={selectedCharacter}
        open={!!selectedCharacter}
        onClose={handleCloseModal}
      />
    </div>
  );
}
