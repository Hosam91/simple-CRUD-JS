let siteName = document.getElementById('siteName')
let siteUrl = document.getElementById('siteUrl')
let submit = document.getElementById('submit')
let search = document.getElementById('search')
let searchBtn = document.getElementById('searchBtn')
let myIndex = 0
let sites

if (localStorage.getItem('list') !== null) {
  sites = JSON.parse(localStorage.getItem('list'))
  display()
} else {
  sites = []
}

submit.addEventListener('click', function ()
{
  if (validName ()== true && validUrl()==true)
  {
    console.log(validName());
    addInfo();
  } else if (validName() == false || validUrl()== false)
  {
    alert("enter valid name or url")  
  }

})

function addInfo() {
  let site = {
    name: siteName.value,
    url: siteUrl.value,
  }
  sites.push(site)
  localStorage.setItem('list', JSON.stringify(sites))
  console.log(sites)
  display()
  clear()
  
}
function display() {
  let box = ``
  for (let i = 0; i < sites.length; i++) {
    box += `
    <tr>
    <td>${i + 1}</td>
    <td>${sites[i].name}</td>
    <td><a href="${sites[i].url}">${sites[i].name}</a> </td>
    <td><button class="btn btn-outline-warning" onclick="update(${i})">update</button>
</td>
  <td>

  <button class="btn btn-outline-danger" onclick="deleteMe(${i})">Delete</button>
    </td>
  </tr>
    `
    document.getElementById('tableData').innerHTML = box
  }
}

function deleteMe(index) {
  sites.splice(index, 1)
  localStorage.setItem('list', JSON.stringify(sites))

  display()
}

search.addEventListener('keyup', function () {
  let searchValue = search.value
  let box = ``
  for (let i = 0; i < sites.length; i++) {
    if (sites[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
      console.log(sites[i])
      box += `
      <tr>
      <td>${i + 1}</td>
      <td>${sites[i].name}</td>
      <td><a href="${sites[i].url}">${sites[i].name}</a> </td>
      <td><button class="btn btn-outline-warning" onclick="update(${i})">update</button></td>


    <td>
  
    <button class="btn btn-outline-danger" onclick="deleteMe(${i})">Delete</button>
      </td>
    </tr>
      `
    }
    document.getElementById('tableData').innerHTML = box
  }
})
function clear() {
  siteName.value = ``
  siteUrl.value = ``
}
function update(index) {
  myIndex = index
  siteName.value = sites[index].name
  siteUrl.value = sites[index].url
  document.getElementById('edit').style.display = 'block'
  document.getElementById('submit').style.display = 'none'
}

function edit(index) {
  newSite = {
    name: siteName.value,
    url: siteUrl.value,
  }
  sites[myIndex] = newSite
  localStorage.setItem('list', JSON.stringify(sites))
  document.getElementById('submit').style.display = 'block'
  document.getElementById('edit').style.display = 'none'
  display()
  clear()
}


function validName() {
  let regex =/^[a-zA-Z]+[a-zA-Z]+$/
  if (regex.test(siteName.value)) {
    document.getElementById("validName").style.display = 'none'
    return true
  } else {
    document.getElementById("validName").style.display='block'
    return false
  }
}
siteName.addEventListener('blur', validName)



function validUrl() {
  let regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/

  if (regex.test(siteUrl.value)) {
    document.getElementById("validUrl").style.display = 'none'
    return true
  } else {
    document.getElementById("validUrl").style.display='block'
    return false
  }

}
siteUrl.addEventListener('blur', validUrl)




