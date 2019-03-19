const newCandidates = [
  { name: "Kerrie", skills: ["JavaScript", "Docker", "Ruby"] },
  { name: "Mario", skills: ["Python", "AWS"] },
  { name: "Jacquline", skills: ["JavaScript", "Azure"] },
  { name: "Kathy", skills: ["JavaScript", "Java"] },
  { name: "Anna", skills: ["JavaScript", "AWS"] },
  { name: "Matt", skills: ["PHP", "AWS"] },
  { name: "Matt", skills: ["PHP", ".Net", "Docker"] },
];

const defultSkillFilter = 'JavaScript'
const userInputId = 'inputSkill'

let matchAllInputCharacters
let currentSearchTerm = defultSkillFilter

const filteredTable = {
  parentId: 'candidatesFilteredTableParent',
  tableId: 'skillFilteredTable',
  headers: ['Name', 'Skills'],
  cssClass: 'table is-striped is-hoverable is-fullwidth '
}

const handler = {
  checkboxMatchAllCharacters: (checked) => {
    matchAllInputCharacters = checked
    task.searchAndUpdateTable(currentSearchTerm)
  },
  inputSkill: (input) => {
    currentSearchTerm = input
    task.searchAndUpdateTable(currentSearchTerm)
  }
}

const task = {
  loadPage: () => { // this is the first function to be called from html body tag
    task.setInputDefault(userInputId, defultSkillFilter)
    const t = filteredTable
    table.create(t.parentId, t.tableId, t.headers, t.cssClass)
    task.searchAndUpdateTable(defultSkillFilter)
  },
  setInputDefault: (userInputId, skill) => {
    const domInput = document.getElementById(userInputId)
    domInput.setAttribute("value", skill);
  },
  searchAndUpdateTable: (skill) => {
    const filteredCandidates = task.filterCandidateBySkill(newCandidates, skill, matchAllInputCharacters)
    table.removeRows(filteredTable.tableId)
    table.insertCandidates(filteredTable.tableId, filteredCandidates)
  },
  filterCandidateBySkill: (newCandidates, skillToFilter, matchAllCharacters) => {
    const filterRegExp = new RegExp(skillToFilter, 'mi') // regexp that is case insensitive
    return newCandidates
      .filter(row => {
        let rowMatch
        row.skills.forEach(e => {
          if (matchAllCharacters) {
            e.match(filterRegExp) && skillToFilter.length === e.length ? rowMatch = true : false
          }
          else {
            e.match(filterRegExp) ? rowMatch = true : false
          }
        })
        return rowMatch
      })
  },
  highlightSuccessfulTest: () => {
    
  }
}

const table = {
  create: (parentId, tableId, headers, cssClass) => {

    // create table tags
    const newTable = document.createElement("TABLE");
    newTable.setAttribute("class", cssClass)
    newTable.setAttribute("id", tableId);
    const tBody = document.createElement("TBODY");
    const tHead = document.createElement("THEAD");
    const tr = document.createElement("TR");

    headers.forEach(header => {
      const th = document.createElement("TH");
      const cell = document.createTextNode(header);
      th.appendChild(cell);
      tr.appendChild(th);
    });

    // append tags and write to page
    tHead.appendChild(tr);
    newTable.appendChild(tHead)
    newTable.appendChild(tBody)
    document.getElementById(parentId).appendChild(newTable)
  },
  removeRows: (tableId) => {
    const domTable = document.getElementById(tableId)
    const rows = domTable.getElementsByTagName("tr");

    while (rows.length > 1) { // Removes all rows except for the header row
      domTable.deleteRow(1);
    }
  },
  insertCandidates: (tableId, candidates) => {

    const domTable = document.getElementById(tableId);
    const tbody = domTable.getElementsByTagName('tbody')[0];

    candidates.forEach(candidate => {
      const newRow = tbody.insertRow();
      const nameCell = newRow.insertCell();
      const skillCell = newRow.insertCell();

      const candidateName = document.createTextNode(candidate.name);
      const candidateSkills = document.createTextNode(candidate.skills.join(', '));

      nameCell.appendChild(candidateName);
      skillCell.appendChild(candidateSkills);
    });
  }
}

module.exports = task // this is for unit tests with jest. Refer to readme-tests.txt on root dir