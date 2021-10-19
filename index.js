console.log("hello world");
let globalTAskCard = [];
const AddCard = () => {
  const NewTask = {
    id: `${Date.now()}`,
    name: document.getElementById("Username").value,
    email: document.getElementById("Email").value,
    Courses: document.getElementById("Course").value,
    Image: document.getElementById("ImageUrl").value,
    Review: document.getElementById("Course-Review").value,
  };
  console.log(AddCard.id);
  let taskContents = document.getElementById("taskContents");
  taskContents.insertAdjacentHTML("beforeend", CreateTask(NewTask))
  globalTAskCard.push(NewTask);
  SaveLocalStorage();
};
const CreateTask = ({ id, name, email, Courses, Image, Review }) => {
  return (` 
  <div class="col-md-6 col-lg-4 mt-5">
  <div class="card ">
    <div class="card-header d-flex justify-content-end">
      <div class="space">
        <button type="button" class="btn btn-outline-info name=${id} onclick="editCard(this)">
          <i class="fas fa-pencil-alt" name=${id} onclick="editCard(this)"></i>
        </button>
        <button type="button"  class="btn btn-outline-danger" name=${id} onclick="DeleteTask(this)">
          <i class="fas fa-trash-restore-alt" name=${id} onclick="DeleteTask(this)"></i>
        </button>
        <button class="btn btn-outline-info" name=${id} onclick="SaveEdit(this)">View Course</button>
      </div>

    </div>
    <img class="card-image" email="${email}" src="${Image}" alt="image">
    <div class="card-body">
    <i class="fas fa-id-card"></i>&nbsp;<span class="card-title"> ${name}</span><br>
    <i class="fas fa-laptop-code"></i>&nbsp;<span class="card-title"> ${Courses}</span>
      <div class="card-middle">
        
      <i class="fas fa-sticky-note"></i>&nbsp;<span class="card-text"> ${Review}</span>
      </div>

    </div>
    <div class="card-footer">
      <button class="btn btn-outline-info float-end">Open Review</button>
    </div>

  </div>

</div>`
  );
};
const SaveLocalStorage = () => {
  localStorage.setItem("CrashCourse", JSON.stringify({ CrashCourse: globalTAskCard }))
}
const Onreload = () => {
  const ReloadaCopy = JSON.parse(localStorage.getItem("CrashCourse"));
  if (ReloadaCopy) {
    globalTAskCard = ReloadaCopy["CrashCourse"]
    console.log(globalTAskCard);
    globalTAskCard.forEach((cardData) => {
      taskContents.insertAdjacentHTML("beforeend", CreateTask(cardData));
    })
  }

}

const DeleteTask = (e) => {
  console.log(e);
  const TargetId = e.getAttribute("name");
  console.log(TargetId);
  globalTAskCard = globalTAskCard.filter((cardData) => cardData.id !== TargetId);
  SaveLocalStorage();
  window.location.reload();
}
const editCard=(e)=>
{
  const TargetId=e.getAttribute("name");
  console.log(TargetId);
  console.log(e.parentNode.parentNode.childNodes[5]);
  e.parentNode.childNodes[1].innerHTML="save";
  e.parentNode.childNodes[1].setAttribute("onclick","SaveEdit(this)")
  console.log(e.parentNode.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML);
  console.log(e.parentNode.parentNode.parentNode.parentNode.childNodes[5].childNodes[8].innerHTML);
  console.log(e.parentNode.parentNode.parentNode.parentNode.childNodes[5].childNodes[10].childNodes[3].innerHTML);
  e.parentNode.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","true");
  e.parentNode.parentNode.parentNode.parentNode.childNodes[5].childNodes[8].setAttribute("contenteditable","true");
  e.parentNode.parentNode.parentNode.parentNode.childNodes[5].childNodes[10].childNodes[3].setAttribute("contenteditable","true");
}

const SaveEdit=(e)=>
{
  const TargetId=e.getAttribute("name")
  const UpdatedCard=
  {
    id: TargetId,
    name:e.parentNode.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML,
    email:e.parentNode.parentNode.parentNode.parentNode.childNodes[3].getAttribute("email"),
    Courses:e.parentNode.parentNode.parentNode.parentNode.childNodes[5].childNodes[8].innerHTML,
    Image: e.parentNode.parentNode.parentNode.parentNode.childNodes[3].getAttribute("src"),
    Review:e.parentNode.parentNode.parentNode.parentNode.childNodes[5].childNodes[10].childNodes[3].innerHTML,
  }
  console.log(UpdatedCard.id)
  var len=globalTAskCard.length;
  for(var i=0;i<len;i++)
  {
    if(globalTAskCard[i].id==TargetId)
    {
      var index=i;
      console.log(index);
    }
  }
  globalTAskCard[index]=UpdatedCard;
  SaveLocalStorage();
  window.location.reload();
}

