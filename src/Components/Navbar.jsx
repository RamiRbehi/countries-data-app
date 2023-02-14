import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 10vh;
    background-color: hsl(0, 0%, 100%);
    display: flex;
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
`
const Right = styled.div`
    flex: 1;
`

const Navbar = () => {
  return (
    <Container>
        <Left>
            <Title>Where in the world?</Title>
        </Left>
        <Right>

        </Right>
    </Container>
  )
}

export default Navbar