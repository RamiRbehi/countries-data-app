import styled from "styled-components"
import SearchIcon from '@mui/icons-material/Search';
import { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { mobile } from "../Responsive";

const Container = styled.div`
`
const SearchContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: start;
    justify-content: start;
    margin-left: 20px;

    ${mobile({width: "85%",
    marginLeft: "30px"})}
`
const Input = styled.input`
    width: 300px;
    height: 40px;
    border: 0;
    border-radius: 5px;
    box-shadow: 2px 2px 10px -1px rgba(0,0,0,0.75);
    padding-left: 60px;
    background-color: ${({theme}) => theme.BackgroundColor};
    color: ${({theme}) => theme.searchColor};
`


const Search = ({ countries, setFilteredCountries, filteredCountries, setRandomCountries }) => {
    const {isDarkMode} = useContext(ThemeContext);
    const [selectedRegion, setSelectedRegion] = useState("");
    
    

    const handleSearch = (event, allCountries) => {
        const searQuery = event.target.value.toLowerCase();
        const filteredCountries = allCountries.filter((country) => {
            return country.name.common.toLowerCase().includes(searQuery);
        });
        setFilteredCountries(filteredCountries);
        setSelectedRegion("");
        console.log(selectedRegion);
    }

    const navbarTheme = {
        BackgroundColor: "hsl(0, 0%, 100%)",
        searchColor: "hsl(0, 0%, 52%)",
        filterColor: "hsl(200, 15%, 8%)"
    }

    const darkTheme = {
        BackgroundColor: "hsl(209, 23%, 22%)",
        searchColor: "hsl(0, 0%, 100%)",
        filterColor: "hsl(0, 0%, 100%)"
    }
  return (
    <Container>
        <SearchContainer>
            <SearchIcon style={{position:"absolute",
                                paddingLeft:"20px",
                                paddingTop:"10px"}}/>
            <Input type="text"
                    placeholder="Search for a country..."
                    onChange={(e) => handleSearch(e, countries)}
                    theme={{...navbarTheme, ...(isDarkMode && darkTheme)}}/>
        </SearchContainer>
    </Container>
  )
}

export default Search