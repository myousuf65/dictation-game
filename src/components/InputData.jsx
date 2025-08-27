import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const InputData = () => {
	const [vocabInput, setVocabInput] = useState("")
	const [vocabStorage, setVocabStorage] = useState([])
	const navigate = useNavigate()

	const handleChange = (e) => {
		setVocabInput(e.target.value)
	}

	const handleAddVocab = (e) => {
		e.preventDefault()
		if (vocabInput.trim() !== "") {
			setVocabStorage([...vocabStorage, vocabInput])
			setVocabInput("")
		}
	}

	const handleStartTest = () => {
		if (vocabStorage.length > 0) {
			window.localStorage.setItem("vocabStorage", JSON.stringify(vocabStorage))
			navigate("/test")
		} else {
			alert("Add some words first!")
		}
	}

	const handleRemoveVocab = (index) => {
		const newVocab = [...vocabStorage]
		newVocab.splice(index, 1)
		setVocabStorage(newVocab)
	}

	// Inline styles for the kid-friendly theme
	const containerStyle = {
		fontFamily: "'Comic Sans MS', cursive, sans-serif",
		backgroundColor: "#f0f9ff",
		minHeight: "100vh",
		padding: "20px",
		textAlign: "center"
	}

	const titleStyle = {
		color: "#ff6b6b",
		fontSize: "2.5rem",
		marginBottom: "20px",
		textShadow: "2px 2px 0px #ffde59"
	}

	const inputPoolStyle = {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: "15px",
		margin: "30px auto",
		maxWidth: "600px"
	}

	const singleVocabStyle = {
		backgroundColor: "#ffde59",
		padding: "12px 20px",
		borderRadius: "25px",
		fontSize: "1.2rem",
		fontWeight: "bold",
		color: "#ff6b6b",
		boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
		cursor: "pointer",
		transition: "all 0.2s ease",
		position: "relative"
	}

	const removeButtonStyle = {
		position: "absolute",
		top: "-8px",
		right: "-8px",
		backgroundColor: "#ff6b6b",
		color: "white",
		border: "none",
		borderRadius: "50%",
		width: "20px",
		height: "20px",
		fontSize: "12px",
		cursor: "pointer"
	}

	const inputContainerStyle = {
		margin: "30px"
	}

	const inputStyle = {
		padding: "12px 15px",
		fontSize: "1.1rem",
		border: "3px solid #ffde59",
		borderRadius: "25px",
		outline: "none",
		width: "250px",
		marginRight: "10px"
	}

	const addButtonStyle = {
		padding: "12px 25px",
		fontSize: "1.1rem",
		backgroundColor: "#4cd964",
		color: "white",
		border: "none",
		borderRadius: "25px",
		cursor: "pointer",
		fontWeight: "bold",
		boxShadow: "0 4px 0 #38a14f",
		transition: "all 0.1s ease"
	}

	const startButtonStyle = {
		padding: "15px 40px",
		fontSize: "1.3rem",
		backgroundColor: "#ff6b6b",
		color: "white",
		border: "none",
		borderRadius: "30px",
		cursor: "pointer",
		fontWeight: "bold",
		boxShadow: "0 6px 0 #d14242",
		transition: "all 0.1s ease",
		marginTop: "20px"
	}

	const instructionStyle = {
		color: "#5b7c9d",
		fontSize: "1.2rem",
		marginBottom: "20px"
	}

	// Animation for button clicks
	const buttonActiveStyle = {
		transform: "translateY(4px)",
		boxShadow: "0 2px 0 #38a14f"
	}

	const startButtonActiveStyle = {
		transform: "translateY(6px)",
		boxShadow: "0 0px 0 #d14242"
	}

	const [isAddButtonActive, setIsAddButtonActive] = useState(false)
	const [isStartButtonActive, setIsStartButtonActive] = useState(false)

	useEffect(() => {
		const audio = new Audio('background.mp3');

		audio.loop = true;
		audio.play().catch(console.error);
		audio.volume = 0.3

		return () => {
			audio.pause();
			audio.src = '';  
		};
	}, []);

	return (
		<div style={containerStyle}>
			<h1 style={titleStyle}>Vocabulary Fun!</h1>

			<p style={instructionStyle}>Add words you want to learn, then test yourself!</p>

			<div style={inputPoolStyle}>
				{vocabStorage.map((vocab, index) => (
					<div key={index} style={singleVocabStyle}>
						{vocab}
						<button
							style={removeButtonStyle}
							onClick={() => handleRemoveVocab(index)}
							aria-label={`Remove ${vocab}`}
						>
							×
						</button>
					</div>
				))}
			</div>

			<div style={inputContainerStyle}>
				<input
					value={vocabInput}
					onChange={handleChange}
					placeholder="Enter a word..."
					style={inputStyle}
					onKeyPress={(e) => e.key === 'Enter' && handleAddVocab(e)}
				/>
				<button
					style={{
						...addButtonStyle,
						...(isAddButtonActive ? buttonActiveStyle : {})
					}}
					onClick={handleAddVocab}
					onMouseDown={() => setIsAddButtonActive(true)}
					onMouseUp={() => setIsAddButtonActive(false)}
					onMouseLeave={() => setIsAddButtonActive(false)}
				>
					Add Word
				</button>
			</div>

			<button
				style={{
					...startButtonStyle,
					...(isStartButtonActive ? startButtonActiveStyle : {})
				}}
				onClick={handleStartTest}
				onMouseDown={() => setIsStartButtonActive(true)}
				onMouseUp={() => setIsStartButtonActive(false)}
				onMouseLeave={() => setIsStartButtonActive(false)}
				disabled={vocabStorage.length === 0}
			>
				Start Test!
			</button>
		</div>
	)
}
