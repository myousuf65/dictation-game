import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/test.css"
import { Modal, Button, Card, Row, Col, Progress, Divider, Tag } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, TrophyFilled } from '@ant-design/icons';

export const Test = () => {
	const [vocabStorage, setVocabStorage] = useState([])
	const [arrLength, setArrLength] = useState(0)
	const [index, setIndex] = useState(0)
	const [vocabToShow, setVocabToShow] = useState("")
	const [inputVal, setInputVal] = useState("")
	const navigate = useNavigate()
	const [score, setScore] = useState(new Array());
	const [showScore, setShowScore] = useState(false)
	const [gameData, setGameData] = useState({
		correctWords: [],
		incorrectWords: [],
		totalScore: 0
	})


	useEffect(() => {
		let data = window.localStorage.getItem("vocabStorage")
		if (data === null) {
			navigate("/")
		}
		setVocabStorage(JSON.parse(window.localStorage.getItem("vocabStorage")))
		function handlekeyup(e) {
			if (e.key.length > 1) {
				if (e.key === "Backspace") setInputVal(prevState => prevState.slice(0, -1))
				if (e.key === "Enter") { handleVocabSubmission() }
				if (e.keyCode === 9) e.preventDefault()
			} else {
				setInputVal(prevState => prevState.concat(e.key))
			}
		}

		document.addEventListener('keyup', handlekeyup);

		return (() => {
			document.removeEventListener("keyup", handlekeyup);
		})
	}, [])

	useEffect(() => {
		setArrLength(vocabStorage.length)
		setScore(new Array(vocabStorage.length).fill(0))
		setVocabToShow(vocabStorage[index])
	}, [vocabStorage])


	useEffect(() => {
		setVocabToShow(vocabStorage[index])
	}, [index])

	useEffect(() => {
		if (vocabToShow) {
			let text = "Please write: " + vocabToShow
			const utterance = new SpeechSynthesisUtterance(text);
			window.speechSynthesis.speak(utterance);
		}
	}, [vocabToShow])

	const handleVocabSubmission = () => {
		if (inputVal === "") {
			let utterance = new SpeechSynthesisUtterance("Please type " + vocabToShow);
			window.speechSynthesis.speak(utterance)
		}
		else if (inputVal === vocabToShow) {
			const audio = new Audio("win.mp3")
			let sc = score;
			if (sc[index] === 0) {
				sc[index] = 1;
				setScore(sc)
			}
			audio.play()
			setInputVal("")
			setTimeout(() => {
				if (index === (arrLength - 1)) {
					endGameCalculation();
					console.log("show board now")
				} else {
					setIndex(prevState => prevState + 1)
				}
			}, 2000)
		} else {
			const audio = new Audio("lose.mp3")
			audio.play()
			let sc = score;
			if (sc[index] === 0) {
				sc[index] = 2;
				setScore(sc)
			}
			setInputVal("")
			setTimeout(() => {
				let text = "The spelling is ";
				let utterance = new SpeechSynthesisUtterance(text);
				window.speechSynthesis.speak(utterance);
				for (let i = 0; i < text.length; i++) {
					utterance = new SpeechSynthesisUtterance(vocabToShow[i]);
					window.speechSynthesis.speak(utterance)
				}
			}, 1400)
		}
	}

	function handlePlay() {
		let utterance = new SpeechSynthesisUtterance(vocabToShow);
		window.speechSynthesis.speak(utterance)
	}

	function endGameCalculation() {
		const correctWords = [];
		const incorrectWords = [];

		score.forEach((item, idx) => {
			if (item === 1) {
				correctWords.push(vocabStorage[idx]);
			} else if (item === 2) {
				incorrectWords.push(vocabStorage[idx]);
			}
		});
		const totalScore = Math.round((correctWords.length / arrLength) * 100);
		if(totalScore === 100 ){
			let yay = new Audio("yay.mp3");
			yay.play();
		}
		setGameData({
			correctWords,
			incorrectWords,
			totalScore
		});
		setShowScore(true);
	}

	const handleTryAgain = () => {
		setShowScore(false)
		setIndex(0)
		setScore(new Array(arrLength).fill(0))
		setGameData({
			incorrectWords : [],
			correctWords : [],
			totalScore : 0
		})
		setShowScore(false);
	};

	const handleNewGame = () => {
		navigate("/")	
		setShowScore(false);
	};


	return (
		<div className="container">
			<div style={{
				width: "80%",
				display: "flex",
				justifyContent: "right"
			}}>
				<button onClick={handlePlay} style={{
					fontSize: "50px"
				}}> 📢</button>
			</div>

			<div className="neonText">
				{inputVal}
			</div>
			<button className="submit" onClick={handleVocabSubmission}>submit </button>

			<div className="progressBar" >
				{
					score.map((item) => {
						if (item === 0) { return <div className="PE"></div> }
						else if (item === 1) { return <div className="PP"></div> }
						else if (item == 2) { return <div className="PF"></div> }
					})
				}
			</div>

			{
				showScore && (
					<ScoreModal 
						gameData={gameData}
						handleNewGame={handleNewGame}
						handleTryAgain={handleTryAgain}
						showScore={showScore}
						setShowScore={setShowScore}
					/>
				)
			}
		</div>
	)
}





function ScoreModal(props) {
	const { gameData, setShowScore, showScore, handleTryAgain, handleNewGame } = props;
	console.log(props)

	return (
		<Modal
			title={
				<span style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
					<TrophyFilled style={{ color: '#ffd666' }} />
					Game Result
				</span>
			}
			open={showScore}
			onCancel={() => setShowScore(false)}
			footer={[
				<Button key="tryAgain" size="large" onClick={handleTryAgain}>
					Try Again
				</Button>,
				<Button key="newGame" type="primary" size="large" onClick={handleNewGame}>
					New Game
				</Button>
			]}
			width={700}
			centered
		>
			{/* Score Summary */}
			<div style={{ textAlign: 'center', marginBottom: '24px' }}>
				<h2 style={{ marginBottom: '8px', fontSize: '28px', fontWeight: 'bold' }}>
					Your Score: {gameData.totalScore}%
				</h2>
				<Progress
					type="circle"
					percent={gameData.totalScore}
					width={80}
					strokeColor={gameData.totalScore >= 80 ? '#52c41a' : gameData.totalScore >= 60 ? '#faad14' : '#f5222d'}
					format={percent => `${percent}%`}
				/>
				<div style={{ marginTop: '16px' }}>
					<Tag color="green" style={{ fontSize: '16px', padding: '8px 16px' }}>
						{gameData.correctWords.length} Correct
					</Tag>
					<Tag color="red" style={{ fontSize: '16px', padding: '8px 16px' }}>
						{gameData.incorrectWords.length} Incorrect
					</Tag>
				</div>
			</div>

			<Divider />

			{/* Correct Words Section */}
			<h3 style={{ color: '#52c41a', fontSize: '18px' }}>
				<CheckCircleFilled /> Correct Words ({gameData.correctWords.length})
			</h3>
			<Row gutter={[12, 12]} style={{ marginBottom: '24px' }}>
				{gameData.correctWords.map((word, index) => (
					<Col key={`correct-${index}`}>
						<Card
							size="small"
							style={{
								border: '1px solid #d9d9d9',
								backgroundColor: '#f6ffed',
								borderRadius: '6px',
								textAlign: 'center'
							}}
							bodyStyle={{ padding: '8px 12px' }}
						>
							{word}
						</Card>
					</Col>
				))}
			</Row>

			<h3 style={{ color: '#f5222d', fontSize: '18px' }}>
				<CloseCircleFilled /> Incorrect Words ({gameData.incorrectWords.length})
			</h3>
			<Row gutter={[12, 12]} style={{ marginBottom: '24px' }}>
				{gameData.incorrectWords.map((word, index) => (
					<Col key={`correct-${index}`}>
						<Card
							size="small"
							style={{
								border: '1px solid #ffccc7',
								backgroundColor: '#fff2f0',
								borderRadius: '6px',
								textAlign: 'center',
								color: '#8c8c8c'

							}}
							bodyStyle={{ padding: '8px 12px' }}
						>
							{word}
						</Card>
					</Col>
				))}
			</Row>
		</Modal>
	)
}

