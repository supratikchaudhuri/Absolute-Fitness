import React from 'react'
import Table from '../components/Table'

function Home() {
	var cols = ["col1", "col2", "col3"];
	const rows = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["10", "12", "13"], ["21", "22", "23"], ["31", "32", "33"]];

  return (
    <>

    <Table cols={cols} rows = {rows}></Table>
    </>
    
  )
}

export default Home