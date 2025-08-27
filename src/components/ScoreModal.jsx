import { Modal, Button, Card, Row, Col, Progress, Divider, Tag } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, TrophyFilled } from '@ant-design/icons';


export default function ScoreModal(props) {
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
			closable={false}
			maskClosable={false}
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

