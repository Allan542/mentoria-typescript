// Solução 1
let employee = {
  code: 10,
  name: "John"
}

// Solução 2
let employee2: {code: number, name: string} = {
  code: 10,
  name: 'John'
}

// Solução 3
interface Employee {
  code: number,
  name: string
}

let employee3: Employee = {
  code: 200,
  name: 'John'
}

// Solução 4 usando a interface da solução 3
const employeeObj = {} as Employee // alias
employeeObj.code = 10
employeeObj.name = 'João'