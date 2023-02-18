import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { mobile } from "../Responsive"
import { ThemeContext } from "./ThemeContext"


const Container = styled.div`
`
const FilterContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: end;
    align-items: flex-end;
    margin-right: 20px;

    ${mobile({margin: "30px 0 0 30px",
    justifyContent: "start"})}
`
const FilterRegion = styled.select`
    border: 0;
    border-radius: 5px;
    width: 150px;
    height: 40px;
    font-size: 12px;
    text-align: start;
    padding-left: 5px;
    font-weight: 500;
    background-color: ${({theme}) => theme.backgroundColor};
    color: ${({theme}) => theme.filterColor};
`
const FilterOption = styled.option`
`

const Filter = ({setFilteredCountries, countries}) => {

    const {isDarkMode} = useContext(ThemeContext);
    const [regionFilter, setRegionFilter] = useState("");

    useEffect(() => {
        console.log(regionFilter);
        if (regionFilter === "") {
            setFilteredCountries(countries);
        } else {
            const filteredCountries = 
                countries.filter(country => country.region === regionFilter);
                setFilteredCountries(filteredCountries)
        }
    }, [regionFilter, countries]);

    const handleRegionFilter = (event) => {
        const selectedRegion = event.target.value;
        setRegionFilter(selectedRegion);
      };

    const handleFilter = () => {
        setRegionFilter("")
    };

    const lightTheme = {
        backgroundColor: "hsl(0, 0%, 100%)",
        filterColor: "hsl(200, 15%, 8%)",
    }

    const darkTheme = {
        backgroundColor: "hsl(209, 23%, 22%)",
        filterColor: "hsl(0, 0%, 100%)"
    }

  return (
    <Container>
        <FilterContainer>
            <FilterRegion onChange={handleRegionFilter}
             theme={{...lightTheme, ...(isDarkMode && darkTheme)}}>
                <FilterOption value=""
                onClick={handleFilter}
                >Filter by region</FilterOption>

                <FilterOption value="Africa"
                onClick={handleFilter}
                >Africa</FilterOption>

                <FilterOption value="Americas"
                onClick={handleFilter}
                >America</FilterOption>

                <FilterOption value="Asia"
                onClick={handleFilter}
                >Asia</FilterOption>

                <FilterOption value="Europe"
                onClick={handleFilter}
                >Europe</FilterOption>

                <FilterOption value="Oceania"
                onClick={handleFilter}
                >Oceania</FilterOption>
            </FilterRegion>
        </FilterContainer>
    </Container>
  )
}

export default Filter