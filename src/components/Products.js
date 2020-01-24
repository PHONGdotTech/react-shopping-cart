import React, {useContext, useState, useEffect} from 'react';
import axios from "axios";

import ProductContext from "../contexts/ProductContext";

// Components
import Product from './Product';

const Products = props => {
	const {products, addItem, setProducts, errorMsg, setErrorMsg} = useContext(ProductContext);
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [height, setHeight] = useState("");
	const [pokemonList, setPokemonList] = useState([]);

	const handleNameChanges = e => {
			setName([e.target.value])
	}

	const handleAgeChanges = e => {
		setAge([e.target.value])
	}

	const handleHeightChanges = e => {
		setHeight([e.target.value])
	}

	const handleSubmit = (name, age, height) => {
		const newThing = {
			name: name,
			age: parseInt(age),
			height: height
		}
		setErrorMsg(""); 
		axios.post(`https://reqres.in/api/users/`, newThing)
		.then(res => {
			console.log(res)
			setProducts([...products, {
				title: res.data.name,
				price: res.data.age
			}])
			setName("")
			setAge("")
			setHeight("");
		})
		.catch(err => {
			console.log(err)
		})
	}


	useEffect(()=> {
		axios
		.get(`https://pokeapi.co/api/v2/pokemon?limit=10`)
		.then(res => {
			setPokemonList(res.data.results);
		})
		.catch(err => {
			console.log(err)
		})
	}, [])
	// console.log("pokemonlist",pokemonList)

	return (
		<div className="products-container">
			{products.map(product => (
				<Product
					key={product.id}
					product={product}
					addItem={addItem}
				/>
			))}
			<div>
				<input type="text" onChange={handleNameChanges} placeholder="Name" name="name" value={name} />
				<input type="text" onChange={handleAgeChanges} placeholder="Age" name="age" value={age} />
				<input type="text" onChange={handleHeightChanges} placeholder="Height" name="height" value={height} />
				<button onClick={()=> {name === "" || age === "" || height === "" ? setErrorMsg("Enter fields") : handleSubmit(name, age, height)}}>Submit</button>
				{errorMsg !== "" && (<div>{errorMsg}</div>)}
			</div>
			<div>
				HELLO
				{pokemonList.map((pokemon,index) => (
					<p key={index}>{pokemon.name}</p>
				))}
			</div>
			
			
		</div>
	);
};

export default Products;
