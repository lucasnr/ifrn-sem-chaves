import React from 'react';

import LabCard from './components/LabCard';

export default class App extends React.Component {

	constructor() {
		super();

		this.state = {
			laboratorios: [
				{
					id: 1,
					nome_usual: "Lamac",
					nome: "Laboratório de Manutenção de Computadores",
					numero: 21,
					status: "Conectado",
					temperatura: 22,
					umidade: 62,
					fechado: false,
					movimento: true
				},
				{
					id: 2,
					nome_usual: "Ladir",
					nome: "Laboratório de Redes",
					numero: 38,
					status: "Conectado",
					temperatura: 24,
					umidade: 29,
					fechado: true,
					movimento: false
				},
				{
					id: 3,
					nome_usual: "Lepeer",
					nome: "Laboratório de Energia",
					numero: 45,
					status: "Desconectado",
					temperatura: 24,
					umidade: 29,
					fechado: true,
					movimento: true
				},
			]
		}

	}
	
	componentDidMount() {
		this.chegarNovo = this.chegarNovo.bind(this);
		this.chegarNovo();
	}

	chegarNovo() {
		const randomId = Math.floor(Math.random() * this.state.laboratorios.length + 1);
		const randomStatus = Math.round(Math.random()) === 1 ? "Conectado" : "Desconectado";
		let randomTemperatura = Math.floor(Math.random() * 38 + 1);
		if(randomTemperatura <= 17) {
			randomTemperatura += 17;
		}

		const chegou = {
			id: randomId,
			status: randomStatus,
			temperatura: randomTemperatura
		}

		console.log(chegou);

		const newList = this.state.laboratorios.map(item => {
			if (item.id === chegou.id) {
				item = {
					...item,
					...chegou
				};
			}
			return item;
		});
		this.setState({ laboratorios: newList });

		setTimeout(this.chegarNovo, 4000);
	}

	render() {
		return this.state.laboratorios.map(lab => <LabCard laboratorio={lab} key={lab.id} />);
	}
}
