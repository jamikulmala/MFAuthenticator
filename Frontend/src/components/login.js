import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button1, Container, HelpButton, HelpText, TextField1 } from "../tools/styles";
import { useAppState } from "../tools/context";

export const Login = () => {

  const { setReqStatus } = useAppState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setReqStatus("Login To Your Account. Email Confirmation Required.")
  },[setReqStatus]);

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
        <HelpButton onClick={() => navigate('/register')}>Forgot your password?</HelpButton>
        <Button1 variant="contained" type="submit">
          Sign In
        </Button1>
        <HelpText>
           New User?
          <HelpButton onClick={() => navigate('/register')}>Sign Up Now</HelpButton>
        </HelpText>
      </form>
    </Container>
  );
};