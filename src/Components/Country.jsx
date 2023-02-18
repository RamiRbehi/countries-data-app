import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { ThemeContext } from "./ThemeContext"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { mobile } from "../Responsive"

const Container = styled.div`
    position: relative;
    color: ${({theme}) => theme.Color};
`
const BackButton = styled.button`
    position: absolute;
    top: -20px;
    left: 70px;
    width: 100px;
    height: 30px;
    border-radius: 5px;
    background: transparent;
    border: 0;
    cursor: pointer;
    box-shadow: 2px 2px 10px -1px hsl(0, 0%, 52%);
    color: ${({theme}) => theme.Color};
`
const CountryInfo = styled.div`
    display: flex;
    width: 100%;
    height: 450px;
    margin-top: 70px;
    justify-content: center;
    align-items: center;

    ${mobile({flexDirection: "column",
    height: "100%"})}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-around;

    ${mobile({marginTop: "50px"})}
`
const Flag = styled.img`
    width: 80%;
    margin-left: 10px;

    ${mobile({marginLeft: "0",
    width: "90%"})}
`
const Right = styled.div`
    flex: 1;
    text-align: start;
    margin-bottom: 60px;
    margin-left: 40px;

    ${mobile({marginLeft: "0px",
    width: "90%"})}
`
const CountryName = styled.p`
    font-size: 24px;
    font-weight: 800;
`
const MoreInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50px;

    ${mobile({flexDirection: "column"})}
`
const Span = styled.span`
    font-size: 18px;
    font-weight: 600;
    margin-right: 5px;
`
const InfoLeft = styled.div`
    flex: 1;
`
const NativeName = styled.p`
    font-weight: 300;
`
const Population = styled.p`
    font-weight: 300;
`
const Region = styled.p`
    font-weight: 300;
`
const SubRegion = styled.p`
    font-weight: 300;
`
const InfoRight = styled.div`
    flex: 1;
`
const Capital = styled.p`
    font-weight: 300;
`
const Area = styled.p`
    font-weight: 300;
`
const Language = styled.p`
    font-weight: 300;
`
const BorderContainer = styled.div`
    display: flex;
    text-align: start;
    align-items: center;
    justify-content: start;

    ${mobile({flexDirection: "column",
    alignItems: "start"})}
`
const BorderList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding-left: 0;
    flex: 1;
    
    &Border{
        ${mobile({display: "inline",})}
    }
`
const Border = styled.li`
    flex: 1;
    width: 70px;
    height: 30px;
    font-weight: 300;
    margin: 5px;
    border-radius: 5px;
    text-align: center;
    background: transparent;
    border: 0;
    cursor: pointer;
    box-shadow: 2px 2px 10px -1px hsl(0, 0%, 52%);
    color: ${({theme}) => theme.Color};
`
const Loading = styled.p`
    font-size: 32px;
    position: absolute;
    left: 50%;
    bottom: 50%;
    color: ${({theme}) => theme.Color};
`
const none = {
    textDecoration: 'inherit',
    color: 'inherit' 
}

const Country = () => {
    const [country, setCountry] = useState(null);
    const {name} = useParams();
    const navigate = useNavigate();
    const {isDarkMode} = useContext(ThemeContext);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/alpha/${name}`)
        .then(response => {
            setCountry(response.data[0]);
        })
        .catch(error => {
            console.log(error);
        });
    }, [name]);

    if (!country) {
            return <Loading>Loading...</Loading>
    }

    const lightTheme = {
        BackgroundColor: "hsl(0, 0%, 100%)",
        Color: "hsl(200, 15%, 8%)",
    }

    const darkTheme = {
        BackgroundColor: "hsl(209, 23%, 22%)",
        Color: "hsl(0, 0%, 100%)",
    }

    const {borders} = country;
  return (
    <Container theme={{...lightTheme, ...(isDarkMode && darkTheme)}}>
        <BackButton  theme={{...lightTheme, ...(isDarkMode && darkTheme)}} 
            onClick={() => navigate("/")}><KeyboardBackspaceIcon fontSize="inherit"/> Back</BackButton>
        <CountryInfo>
            <Left>
                <Flag src={country.flags.svg} alt={`Flag of ${country.name.common}`}/>
            </Left>
            <Right>
                <CountryName>{country.name.common}</CountryName>
                <MoreInfo>
                    <InfoLeft>
                <NativeName><Span>Native Name: </Span>{country.name.official}</NativeName>
                <Population><Span>population: </Span>{country.population.toLocaleString()}</Population>
                <Region><Span>Region: </Span>{country.region}</Region>
                <SubRegion><Span>Sub Region: </Span>{country.subregion}</SubRegion>
                    </InfoLeft>
                    <InfoRight>
                <Capital><Span>Capital: </Span>{country.capital}</Capital>
                <Area><Span>Area: </Span>{country.area.toLocaleString()} km²</Area>
                <Language><Span>Languages: </Span>{Object.values(country.languages).join(', ')}</Language>
                    </InfoRight>
                </MoreInfo>
                    {borders && borders.length > 0 && (
            <BorderContainer>
                            <Span>Border Countries: </Span>
                        <BorderList>
                    {borders.map((border) => (
                        <Link to={`/countries/${border}`} style={none}>
                            <Border key={border}>{border}</Border>
                        </Link>
                    ))}
                </BorderList>
            </BorderContainer>
                    )}
            </Right>
        </CountryInfo>
    </Container>
  )
}

export default Country