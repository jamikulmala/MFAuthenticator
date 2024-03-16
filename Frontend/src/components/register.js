import { useNavigate } from "react-router";
import { Button1, CheckBoxSmall, Container, HelpButton, HelpText, TextField1 } from "../tools/styles";
import { useEffect, useState } from "react";
import { useAppState } from "../tools/context";

export const Register = () => {
  
  const { setReqStatus } = useAppState();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmChange = (event) => {
    setConfirm(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event) => {
    const url = 'http://localhost:8080/register';

    event.preventDefault();

    if (!isChecked) {
      alert('You need to agree the terms to continue');
      return;
    }

    const user = {
      FirstName: name,
      LastName: lastName,
      Email: email,
      Password: password,
      ConfirmPassword: confirm,
      Checked: isChecked
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const responseData = await response.text();
      console.log(responseData);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    setReqStatus("Register By Giving Your Information And Choosing A Strong Password. The Password Is Encypted And The Data Stored Only For Educational Purposes.")
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
          label="First name"
          value={name}
          autoComplete="off"
          onChange={handleNameChange}
        />
        <TextField1
          label="Last name"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <TextField1
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <TextField1
          label="Confirm password"
          type="password"
          value={confirm}
          onChange={handleConfirmChange}
        />
        <HelpText>
          By continuing you agree that the application can process your data for educational purposes
          <CheckBoxSmall checked={isChecked} onChange={handleCheckboxChange}></CheckBoxSmall>
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