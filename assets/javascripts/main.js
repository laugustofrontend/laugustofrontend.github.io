const skill = () => {
  $.getJSON('skill.json', (dados) => {
    $.each(dados.skills, (s, skill) => {
     $('.skills').append(templateSkill(skill.name, skill.skill, skill.column))
    })
    $.each(dados.frameworks, (fw, frame) => {
      $('.skills').append(templateSkill(frame.name, frame.skill, frame.column))
    })
  })
}
skill()
