import axios from "axios"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { mobile } from "../Responsive"
import CountryCard from "./CountryCard"
import Filter from "./Filter"
import Search from "./Search"
import { ThemeContext } from "./ThemeContext"


const Container = styled.div`
    position: relative;
    margin: 50px 60px;
    justify-content: space-between;

    ${mobile({width: "100%",
    marginLeft: "0"})}
`
const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const SearchFilterConatiner = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    justify-content: space-between;
    
    ${mobile({flexDirection: "column"})}
`
const PageButtonContainer = styled.div`
    display: flex;
    position: relative;
    left: 0%;
    bottom: 0;
    transform: translate(0%, 50%);
    margin: 0 auto;
    gap: 10px;
    justify-content: center;
    width: 20%;

    ${mobile({transform: `translate(${0}%, ${100}%)`,
    width: "50%"})}
`
const PageButton = styled.button`
    width: 50px;
    height: 30px;
    border-radius: 5px;
    background: transparent;
    border: 0;
    cursor: pointer;
    box-shadow: 2px 2px 10px -1px hsl(0, 0%, 52%);
    color: ${({theme}) => theme.textColor};
`

const Countries = () => {
    const {isDarkMode} = useContext(ThemeContext);
    const [countries, setCountries] = useState([]);
    const [randomCountries, setRandomCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [selectedPage, setSelectedPage] = useState(0);
    const pageSize = 8;
    const numPages = Math.ceil(filteredCountries.length / pageSize);

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
        .then(response => {
            setCountries(response.data);
            setFilteredCountries(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    
    const getRandomCountries = () => {
        const randomCountries = [];
        const countryCount = countries.length;
        while (randomCountries.length < 8) {
            const randomIndex = Math.floor(Math.random() * countryCount);
            if (!randomCountries.includes(countries[randomIndex])) {
                randomCountries.push(countries[randomIndex]);
            }
        }
        return randomCountries;
    }

    useEffect(() => {
        if(countries.length > 0) {
            setRandomCountries(getRandomCountries(countries));
        }
    }, [countries]);

    const handlePageSelect =  (pageNumber) => {
        setSelectedPage(pageNumber);
    };

    const getPageRange = () => {
        const startIndex =selectedPage * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredCountries.slice(startIndex, endIndex);
    };


    const lightTheme = {
        BackgroundColor: "hsl(0, 0%, 100%)",
        textColor: "hsl(200, 15%, 8%)"
    }

    const darkTheme = {
        BackgroundColor: "hsl(209, 23%, 22%)",
        textColor: "hsl(0, 0%, 100%)"
    }
  return (
    <Container>
      <Wrapper>
        <SearchFilterConatiner>
        <Search setFilteredCountries={setFilteredCountries}
            filteredCountries={filteredCountries}
            randomCountries={randomCountries}
            countries={countries}
            />
            <Filter setFilteredCountries={setFilteredCountries}
            countries={countries}
            />
        </SearchFilterConatiner>
        {filteredCountries.length > 0 &&
         getPageRange().map(country => (    
            <CountryCard key={country.name.common}
            country={country}
            theme={{...lightTheme, ...(isDarkMode && darkTheme)}}/>
        ))}
      </Wrapper>

       {filteredCountries.length > 0 && (
  <PageButtonContainer>
    {selectedPage > 0 && (
      <PageButton theme={{...lightTheme, ...(isDarkMode && darkTheme)}}
       onClick={() => handlePageSelect(selectedPage - 1)}>
        Prev
      </PageButton>
    )}
    {selectedPage > 1 && (
      <PageButton theme={{...lightTheme, ...(isDarkMode && darkTheme)}}
       onClick={() => handlePageSelect(selectedPage - 1)}>
        {selectedPage}
      </PageButton>
    )}
    <PageButton theme={{...lightTheme, ...(isDarkMode && darkTheme)}}
     className="active">{selectedPage + 1}</PageButton>
    {selectedPage < numPages - 1 && (
      <PageButton theme={{...lightTheme, ...(isDarkMode && darkTheme)}}
       onClick={() => handlePageSelect(selectedPage + 1)}>
        Next
      </PageButton>
    )}
  </PageButtonContainer>
)}
    </Container>
  )
}

export default Countries