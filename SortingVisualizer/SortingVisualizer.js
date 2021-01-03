import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getBubbleSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getQuickSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getHeapSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const SECONDARY_COLOR_TWO = 'purple';

export default class SortingVisualizer extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			array: [],
		};
	}

	componentDidMount() {
		this.resetArray();
	}

	resetArray() {
		const array = [];
		for (let i = 0; i < 100; i++){
			array.push(randomIntFromInterval(5,650));
		}
		this.setState({array})
	}

	mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } 
      else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  	bubbleSort() 
    {
        const animations = getBubbleSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) 
        {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = (i % 4 === 0) || (i % 4 === 3); // if first or second value of animations, proceed

          if (isColorChange) 
          {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
           
            if (i%4 === 0)
            {
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR_TWO;
                }, i * ANIMATION_SPEED_MS);
            }

            if (i%4 === 3)
            {
                setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
            }
          }

          else if ( (i % 4 === 1 ||  i % 4 === 2) && animations[i] !== 'no swap')  // if third or fourth value AND swapping occured, change the bars
          {              
            const [barOneIdx, newHeight] = animations[i];

            setTimeout(() => {
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
        
    }
	

	quickSort() {
		const animations = getQuickSortAnimations(this.state.array);
		this.showSwap(animations);
	}

	heapSort() {
		const animations = getHeapSortAnimations(this.state.array);
		this.showSwap(animations);
	}

	showSwap(animations) {
		for ( let i = 0; i < animations.length; i++)
        {
            const arrayBars = document.getElementsByClassName('array-bar');
            let order = i%4;
            if (order === 0)
            {
                let indexOne = animations[i][0];
                let indexTwo = animations[i][1];
                
                setTimeout( () => {
                    arrayBars[indexOne].style.backgroundColor = SECONDARY_COLOR;
                    arrayBars[indexTwo].style.backgroundColor = SECONDARY_COLOR_TWO;
                }, i * ANIMATION_SPEED_MS);
            }
            else if (order === 3)
            {
                let indexOne = animations[i][0];
                let indexTwo = animations[i][1];

                setTimeout( () => {
                    arrayBars[indexOne].style.backgroundColor = PRIMARY_COLOR;
                    arrayBars[indexTwo].style.backgroundColor = PRIMARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
            }
            else if ( order === 1|| order === 2 )
            {
                let indexToChange = animations[i][0];
                let newHeight = animations[i][1];

                setTimeout( () => {
                    arrayBars[indexToChange].style.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
	}

	render(){
		const {array} = this.state;

		return (
			<div className = "array-container">
				{array.map((value, idx) => (
					<div className = "array-bar" key = {idx} style={{backgroundColor: PRIMARY_COLOR, height: `${value}px`,}}>
					</div>
				))}
				<div className ="buttons">
					<button onClick = {() => this.resetArray()}>Generate New Array!</button>
					<button onClick = {() => this.mergeSort()}>Merge Sort</button>
					<button onClick = {() => this.quickSort()}>Quick Sort</button>
					<button onClick = {() => this.heapSort()}>Heap Sort</button>
					<button onClick = {() => this.bubbleSort()}>Bubble Sort</button>
				</div>
			</div>
		);
	}
}


function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
