const task = require('../js/main.js')

const data = [
    { name: "Kerrie", skills: ["JavaScript", "Docker", "Ruby"] },
    { name: "Mario", skills: ["Python", "AWS"] },
    { name: "Jacquline", skills: ["JavaScript", "Azure"] },
    { name: "Kathy", skills: ["JavaScript", "Java"] },
    { name: "Anna", skills: ["JavaScript", "AWS"] },
    { name: "Matt", skills: ["PHP", "AWS"] },
    { name: "Matt", skills: ["PHP", ".Net", "Docker"] },
];

it('finds 4 matches for string "javascript"', () => {
    expect(task.filterCandidateBySkill(data, 'javascript',true)).toHaveLength(4)
})
it('finds 3 matches for string "aws"', () => {
    expect(task.filterCandidateBySkill(data, 'aws', true)).toHaveLength(3)
})
it('finds 2 matches for string "docker"', () => {
    expect(task.filterCandidateBySkill(data, 'docker', true)).toHaveLength(2)
})
it('finds 2 matches for string "php"', () => {
    expect(task.filterCandidateBySkill(data, 'php', true)).toHaveLength(2)
})
it('exact array match for search "ruby"', () => {
    const rubyTest = [{ name: "Kerrie", skills: ["JavaScript", "Docker", "Ruby"] }]
    expect(task.filterCandidateBySkill(data, 'ruby', true)).toMatchObject(rubyTest)
})
it('exact array match for search "azure"', () => {
    const azureTest = [{ name: "Jacquline", skills: ["JavaScript", "Azure"] }]
    expect(task.filterCandidateBySkill(data, 'azure', true)).toMatchObject(azureTest)
})
it('exact array match for search "java"', () => {
    const javaTest = [{"name": "Kathy", "skills": ["JavaScript", "Java"]}]
    expect(task.filterCandidateBySkill(data, 'java',true)).toMatchObject(javaTest)
})