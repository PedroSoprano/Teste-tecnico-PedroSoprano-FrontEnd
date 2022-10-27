import "./style.css";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { PolicyContext } from "../../Providers/policyProvider";
import axios from "axios";
import { toast } from "react-toastify";

export const Policy = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openRegister, setOpenRegister] = useState(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  const { policy, setChange, change } = useContext(PolicyContext);

  const changePolicy = (newPolicy) => {
    setChange(change + 1);
    axios
      .post("http://localhost:3001/policy", newPolicy)
      .then((res) => {
        toast.success("Nova política cadastrada");
      })
      .catch((err) => console.log(err));
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
  };

  const [bom, setBom] = useState("");
  const [critico, setCritico] = useState("");

  return (
    <>
      <div className="containerPolicy">
        <h2 className="policyTitle">Política de Estoque</h2>
        <Button
          variant="outlined"
          sx={{ color: "#e02550", borderColor: "#e02550", marginTop: 1 }}
          onClick={handleOpenRegister}
        >
          CADASTRAR POLÍTICA DE ESTOQUE
        </Button>
      </div>
      <div className="containerInfo">
        <header className="headerContainer">
          <p>Ótimo</p>
          <p className="bom">Bom</p>
          <p className="critico">Crítico</p>
        </header>
        <div className="rowPolicy">
          <div className="contentPolicyGreat">
            <p>&gt;{policy.great}</p>
          </div>
          <div className="contentPolicyGood">
            <p>
              {policy.great} até {policy.critic}
            </p>
          </div>
          <div className="contentPolicyCritic">
            <p>&lt; {policy.critic} </p>
          </div>
          <div className="iconPen">
            <button className="buttonPen">
              <CreateIcon onClick={handleOpen} sx={{ color: "#e02550" }} />
            </button>
          </div>
        </div>
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <div className="headerModal">
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ color: "#e02550" }}
                  >
                    Editar Política de estoque
                  </Typography>
                  <button className="exit" onClick={handleClose}>
                    X
                  </button>
                </div>
                <div className="formModal">
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                    paddingLeft={5}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Ótimo"
                      variant="outlined"
                      required
                      onChange={(event) => setBom(event.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Crítico"
                      variant="outlined"
                      required
                      onChange={(event) => setCritico(event.target.value)}
                    />
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#e02550",
                        fontWeight: 400,
                      }}
                      onClick={(e) =>
                        changePolicy({ critic: critico, great: bom })
                      }
                    >
                      Editar
                    </Button>
                    <Button
                      variant="text"
                      sx={{ color: "#b8b7b7", fontWeight: 400 }}
                      onClick={handleClose}
                    >
                      Cancelar
                    </Button>
                  </Box>
                </div>
              </Box>
            </Fade>
          </Modal>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openRegister}
            onClose={handleCloseRegister}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openRegister}>
              <Box sx={style}>
                <div className="headerModal">
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ color: "#e02550" }}
                  >
                    Cadastrar Política de estoque
                  </Typography>
                  <button className="exit" onClick={handleCloseRegister}>
                    X
                  </button>
                </div>
                <div className="formModal">
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                    paddingLeft={5}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Ótimo"
                      variant="outlined"
                      required
                      onChange={(event) => setBom(event.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Crítico"
                      variant="outlined"
                      required
                      onChange={(event) => setCritico(event.target.value)}
                    />
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#e02550",
                        fontWeight: 400,
                      }}
                      onClick={(e) =>
                        changePolicy({ critic: critico, great: bom })
                      }
                    >
                      Cadastrar
                    </Button>
                    <Button
                      onClick={handleCloseRegister}
                      variant="text"
                      sx={{ color: "#b8b7b7", fontWeight: 400 }}
                    >
                      Cancelar
                    </Button>
                  </Box>
                </div>
              </Box>
            </Fade>
          </Modal>
        </div>
      </div>
    </>
  );
};
