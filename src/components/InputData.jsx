import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/buttons.css"


export const InputData = () => {
	const [vocabInput, setVocabInput] = useState("")
	const [vocabStorage, setVocabStorage] = useState([])
	const navigate = useNavigate()

	const handleChange = (e)=>{
		setVocabInput(e.target.value)
	}

	const handleAddVocab = (e)=>{
		e.preventDefault()
		setVocabStorage([...vocabStorage, vocabInput])
		setVocabInput("")
	}

	const handleStartTest = () =>{
		window.localStorage.setItem("vocabStorage", JSON.stringify(vocabStorage))
		navigate("/test")
	}

	return (
		<div className='container'>
			<div className='inputPool'>
				{
					vocabStorage.map(vocab =>{
						return <div className='singleVocab'>{vocab}</div>
					})
				}
			</div>
			<p>Input the Vocab that you want to study</p>
	
			<div style={{margin:"30px"}}>
				<input value={vocabInput} onChange={handleChange} />
				<button className='gummy-cherry' onClick={handleAddVocab}> add</button>
			</div>

			<button onClick={handleStartTest}>Start Test </button>
		</div>
	)
}


