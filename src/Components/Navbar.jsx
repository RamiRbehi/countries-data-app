import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useContext } from "react";
import styled from "styled-components";
import { mobile } from '../Responsive';
import { DarkMode } from "./DarkMode";
import { ThemeContext } from './ThemeContext';

const Container = styled.div`
    width: 100%;
    height: 10vh;
    display: flex;
    box-shadow: 2px 2px 10px -1px rgba(0,0,0,0.75);
    background-color: ${({theme}) => theme.navBackgroundColor};
    color: ${({theme}) => theme.navColor};
`
const Left = styled.div`
    flex: 1;
    justify-content: left;
    align-items: start;
`
const Title = styled.h1`
    font-size: 24px;
    text-align: left;
    margin-left: 80px;

    ${mobile({fontSize: "16px", 
    marginLeft: "25px",
    marginTop: "15px"})}
`
const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: right;
    align-items: center;
`
const ButtonDarkMode = styled.button`
    border: 0;
    background: transparent;
    background-color: ${({theme}) => theme.navBackgroundColor};
    color: ${({ theme }) => theme.navColor};
    color: inherit;
    cursor: pointer;
    margin-right: 80px;

    ${mobile({marginRight: "25px"})}
`

const Navbar = () => {

    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

    const navbarTheme = {
        navBackgroundColor: "hsl(0, 0%, 100%)",
        navColor: "hsl(200, 15%, 8%)",
    }

    const darkTheme = {
        navBackgroundColor: "hsl(209, 23%, 22%)",
        navColor: "hsl(0, 0%, 100%)"
    }

    return (
    <Container theme={{...navbarTheme, ...(isDarkMode && darkTheme)}}>
        <Left>
            <Title>Where in the world?</Title>
        </Left>
        <Right>
            <>
            <ButtonDarkMode onClick={toggleDarkMode}><DarkModeOutlinedIcon fontSize="inherit"/>Dark Mode</ButtonDarkMode>
            {isDarkMode && <DarkMode/>} 
            </>
        </Right>
    </Container>
  )
}

export default Navbar