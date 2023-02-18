import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../Responsive';


const CountryContainer = styled.div`
    width: 35%;
    flex: 1 0 21%;
    margin: 20px;
    text-align: start;
    border-radius: 10px;
    background-color: ${({theme}) => theme.BackgroundColor};
    color: ${({theme}) => theme.textColor};

    ${mobile({flex: "1 0 50%",
    margin: "30px"})}
`
const Flag = styled.img`
    width: 100%;
    max-height: 150px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`
const CountryName = styled.p`
    font-size: 20px;
    font-weight: 700;
    padding-left: 10px;
`
const CuntryInfo = styled.div`
    padding: 0 10px;
`
const Span = styled.span`
    font-size: 16px;
    font-weight: 800;
    margin-right: 5px;
`
const Population = styled.p` 
`
const Region = styled.p`  
`
const Capital = styled.p`
`
const none = {
    textDecoration: 'inherit',
    color: 'inherit' 
}

const CountryCard = ({country, theme}) => {
  return (
    <CountryContainer key={country.name.common} theme={theme}>
                <Link to={`/countries/${country.cca3}`} style={none}>
                <Flag src={country.flags.svg} alt={country.name.common}/>
                <CountryName>{country.name.common}</CountryName>
                <CuntryInfo>
                <Population><Span>Population:</Span>{country.population.toLocaleString()}</Population>
                <Region><Span>Region:</Span>{country.region}</Region>
                <Capital><Span>Capital:</Span>{country.capital}</Capital>
                </CuntryInfo>
                </Link>
            </CountryContainer>
  )
}

export default CountryCard