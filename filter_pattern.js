class Person {
	constructor(name, gender, maritialStatus) {
		this.name = name;
		this.gender = gender;
		this.maritialStatus = maritialStatus;
	}
	
	getName() {
		return this.name;
	}
	
	getGender() {
		return this.gender;
	}
	
	getMaritialStatus() {
		return this.maritialStatus;
	}
}

/*const person = new Person('Cris', 'Male', 'Single');
console.log(person.getName());
console.log(person.getGender());
console.log(person.getMaritialStatus());*/

class CriteriaMale {
	constructor() {}
	
	meetCriteria(persons) {
		this.malePersons = [];
		
		for(let i = 0; i < persons.length; i++) {
			if(persons[i].getGender() == 'Male') {
				this.malePersons.push(persons[i]);
			}
		}
		return this.malePersons;
	}
}

class CriteriaFemale {
	constructor() {}
	
	meetCriteria(persons) {
		this.feMalePersons = [];
		
		for(let i = 0; i < persons.length; i++) {
			if(persons[i].getGender() == 'Female') {
				this.feMalePersons.push(persons[i]);
			}
		}
	
		return this.feMalePersons;
	}
}

class CriteriaSingle {
	constructor() {}
	
	meetCriteria(persons) {
		this.singlePersons = [];
		
		for(let i = 0; i < persons.length; i++) {
			if(persons[i].getMaritialStatus() == 'Single') {
				this.singlePersons.push(persons[i]);
			}
		}
	
		return this.singlePersons;
	}
}

class AndCriteria {
	constructor(criteria, otherCriteria) {
		this.criteria = criteria;
		this.otherCriteria = otherCriteria;
	}
	
	meetCriteria(persons) {
		const firstCriteriaPersons = this.criteria.meetCriteria(persons);
		return this.otherCriteria.meetCriteria(firstCriteriaPersons);
	}
}

class OrCriteria {
	constructor(criteria, otherCriteria) {
		this.criteria = criteria;
		this.otherCriteria = otherCriteria;
	}
	
	meetCriteria(persons) {
		const firstCriteriaItems = this.criteria.meetCriteria(persons);
		const otherCriteriaItems = this.otherCriteria.meetCriteria(persons);
		
		for(let i = 0; i < otherCriteriaItems.length; i++) {
			if(!firstCriteriaItems.includes(otherCriteriaItems[i])) {
				firstCriteriaItems.push(otherCriteriaItems[i]);
			}
		}
		
		return firstCriteriaItems;
	}
}

const persons = [];
persons.push(new Person('Robert', 'Male', 'Single'));
persons.push(new Person('John', 'Male', 'Married'));
persons.push(new Person('Laura', 'Female', 'Married'));
persons.push(new Person('Diana', 'Female', 'Single'));
persons.push(new Person('Mike', 'Male', 'Single'));
persons.push(new Person('Bobby', 'Male', 'Single'));

//console.log(persons);

const criteriaMale = new CriteriaMale();
const criteriaFemale = new CriteriaFemale();
const criteriaSingle = new CriteriaSingle();
const criteriaSingleMale = new AndCriteria(criteriaSingle, criteriaMale);
const criteriaSingleOrFemale = new OrCriteria(criteriaSingle, criteriaFemale);

function printPersons(persons) {
	for(let i = 0; i < persons.length; i++) {
		console.log('Person : [ Name : ' + persons[i].getName() + ', Gender : ' + persons[i].getGender() + ', Maritial Status : ' + persons[i].getMaritialStatus());
	}
}

console.log('Males: ');
console.log(criteriaMale.meetCriteria(persons));

console.log('Females: ');
console.log(criteriaFemale.meetCriteria(persons));

console.log('Single: ');
console.log(criteriaSingle.meetCriteria(persons));

console.log('Single: Males');
console.log(criteriaSingleMale.meetCriteria(persons));

console.log('Single or Females');
console.log(criteriaSingleOrFemale.meetCriteria(persons));
