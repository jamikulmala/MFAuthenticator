import { useNavigate } from "react-router";
import { Button1, CheckBoxSmall, Container, HelpButton, HelpText, TextField1 } from "../tools/styles";
import { useEffect, useState } from "react";
import { useAppState } from "../tools/context";

export const Register = () => {
  
  const { setReqStatus } = useAppState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmChange = (event) => {
    setConfirm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setReqStatus("Register By Giving Your Information And Choosing A Strong Password. Don't Worry Everything Is Encypted And The Data Stored Only For Educational Purposes.")
  },[]);

  return (
    <Container>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <TextField1
          label="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField1
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <TextField1
          label="Confirm password"
          value={confirm}
          onChange={handleConfirmChange}
        />
        <HelpText>
          By continuing you agree that the application can process your data for educational purposes
          <CheckBoxSmall></CheckBoxSmall>
        </HelpText>
        <Button1 variant="contained" type="submit">
          Sign In
        </Button1>
        <HelpText>
          Returning User?
          <HelpButton onClick={() => navigate('/login')}>Sign In Now</HelpButton>
        </HelpText>
      </form>
    </Container>
  );
};