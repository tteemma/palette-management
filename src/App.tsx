import styled from '@emotion/styled'
import {
	appPalette,
	appPaletteContrast,
} from './components/colorSystem/organisms/palettePresets'

const Main = styled.main`
	background: #232323;
	padding: 32px;
	color: #fff;
	font-family: Inter, Arial, sans-serif;
	width: 100vw;
	box-sizing: border-box;
	overflow-x: hidden;
	width: 1640px;
`

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 24px;
	width: 100%;
	max-width: 1600px;
	margin: 0 auto;
`

const Card = styled.div`
	background: #fff;
	color: #222;
	border-radius: 16px;
	padding: 18px 18px 14px 18px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.07);
	font-family: 'JetBrains Mono', Menlo, monospace;
	font-size: 14px;
	min-height: 120px;
	border: 2px solid #dedede;
	overflow: auto;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	transition: box-shadow 0.2s, border-color 0.2s;
	&:hover {
		box-shadow: 0 6px 32px 0 rgba(0, 0, 0, 0.16);
		border-color: #888;
		z-index: 2;
	}
`

const CardTitle = styled.div`
	font-weight: 700;
	margin-bottom: 8px;
	font-size: 15px;
	letter-spacing: 0.5px;
	color: #1850c0;
	text-shadow: 0 1px 2px #eef3fa60;
`

const Title = styled.h1`
	font-size: 48;
	font-weight: 900;
	margin: 0 0 32px 0;
	letter-spacing: -1;
	color: #fff;
`
const InnerCard = styled.pre`
	margin: 0;
	background: #f8f8f8;
	color: #232323;
	border-radius: 8;
	padding: 10px;
	font-size: 13px;
`
const TitleVS = styled.h1`
	font-size: 48;
	font-weight: 900;
	margin: 32px 0;
	letter-spacing: -1;
	color: #fff;
	text-align: center;
`

function App() {
	return (
		<Main>
			<Title>App Palette</Title>
			<Grid>
				{Object.entries(appPalette).map(([key, value]) => (
					<Card key={key}>
						<CardTitle>{key}</CardTitle>
						<InnerCard>{JSON.stringify(value, null, 2)}</InnerCard>
					</Card>
				))}
			</Grid>
			<TitleVS>VS</TitleVS>
			<Grid>
				{Object.entries(appPaletteContrast).map(([key, value]) => (
					<Card key={key}>
						<CardTitle>{key}</CardTitle>
						<InnerCard>{JSON.stringify(value, null, 2)}</InnerCard>
					</Card>
				))}
			</Grid>
		</Main>
	)
}

export default App
