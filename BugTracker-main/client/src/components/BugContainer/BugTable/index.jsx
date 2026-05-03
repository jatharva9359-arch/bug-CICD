import React, { useState, useEffect } from "react";
import NewBugForm from "../NewBugForm";
import BugRows from "../BugRows";
import { filterByPriority, filterByActive, sortByDate, sortByPriority  } from "../../../services/SortAndFilter";
import { deleteBug, patchBug } from "../../../services/BugsService";
import { apiUrl } from "../../../services/ApiConfig";
import { GrFilter } from 'react-icons/gr';
import { MdSort } from 'react-icons/md';


const BugTable = () => {
  const [allBugs, setAllBugs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [bugsToRender, setBugsToRender] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState("clear");
  const [activeFilter, setActiveFilter] = useState("clear");
  const [dateSort, setDateSort] = useState("clear");
  const [prioritySort, setPrioritySort] = useState("clear");
  const [isAddingBug, setIsAddingBug] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [addUserFieldValue, setAddUserFieldValue] = useState("");

  const [checked, setChecked] = useState(
    new Array({allBugs}.length).fill(false)
  );

  const onRemoveAssignee = (event) => {
    const assigneeIndex = event.target.value;
    const editedBug = bugsToRender[event.target.id];

    const editedBugIndex = allBugs.indexOf(editedBug);

    editedBug.assignees.splice(assigneeIndex, 1);
    patchBug(editedBug);

    const newBugList = [...allBugs];
    newBugList[editedBugIndex] = editedBug;
    setAllBugs(newBugList);
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    fetch(apiUrl("/users"))
      .then((result) => result.json())
      .then((data) => setAllUsers(data));
  };

  const onBugAddition = (newBug) => {
    //Generate date to display
    var today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth()).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = yyyy + mm + dd;

    //Fill in missing fields to allow render
    newBug['dateReported'] = today;
    newBug['assignees'] = [];
    newBug['active'] = true;

    const updatedBugs = [...allBugs, newBug];
    setAllBugs(updatedBugs);
  }

  const onAddAssignee = (event) => {
    const editedBug = bugsToRender[event.target.id];
    const newAssigneeId = event.target.value;
    var newAssignee;
    for(const user of allUsers){
      if(user.id == newAssigneeId){
        newAssignee = user;
        break;
      }
    }
    editedBug.assignees.push(newAssignee);
    patchBug(editedBug);
    const updatedList = [...allBugs];
    const bugIndex = updatedList.findIndex(bug => bug.id == editedBug.id);
    updatedList[bugIndex] = editedBug;
    setAllBugs(updatedList);
  }

  useEffect(() => {
    getAllBugs();
  }, []);

  useEffect(() => {
    setBugsToRender(allBugs);
    setActiveFilter("clear");
    setPriorityFilter("clear");
    setDateSort("clear");
    setPrioritySort("clear");
  }, [allBugs]);

  const getAllBugs = () => {
    fetch(apiUrl("/bugs"))
    .then((result) => result.json())
    .then((data) => {
      setAllBugs(data);
      setBugsToRender(data);
    });
  };

  const handleEditingClick = () => {
    if (isEditing == false) {
      setIsEditing(true)
    } else {
      setIsEditing(false);
    }
  }

  const handleChangePriority = (event) => {
    const editedBug = bugsToRender[event.target.id];
    const editedBugIndex = allBugs.indexOf(editedBug);
    const updatedList = [...allBugs];
    updatedList[editedBugIndex].priority = event.target.value;
    setAllBugs(updatedList);
    patchBug(editedBug);
  }

  const handleOnChange = (position) => {
    const updatedCheckState = checked.map((item, index) =>
    index === position ? !item : item
    );

    setChecked(updatedCheckState);
  };

  const handleToggleActive = (event) => {

    //Find toggled bug and flip value
    const toggledBug = bugsToRender[event.target.value];
    const toggledBugIndex = allBugs.indexOf(toggledBug);
    toggledBug.active = !toggledBug.active;

    const updatedBugsList = [...allBugs];
    updatedBugsList[toggledBugIndex] = toggledBug;
    patchBug(toggledBug)
    .then(setAllBugs(updatedBugsList));
  }

  const removeBug = (id) => {
    const temp = allBugs.map(s => s);
    const indexToDel = temp.map(s => s.id).indexOf(id);
    
    temp.splice(indexToDel, 1);
    setAllBugs(temp);
    deleteBug(id);
  }

  const toggleAdding = () => {
    isAddingBug == false ? setIsAddingBug(true) : setIsAddingBug(false)
  }

  const onFilterByPriority = (event) => {
    setPriorityFilter(event.target.value);
    setActiveFilter("clear");
    setDateSort("clear");
    setPrioritySort("clear");
    if (event.target.value === "clear"){
      setBugsToRender(allBugs);
    }
    else{
      setBugsToRender(filterByPriority(allBugs, event.target.value));
    }
  } 

  const onFilterByActive = (event) => {
    const selectedOption = event.target.value;
    setActiveFilter(selectedOption);
    setPriorityFilter("clear");
    setDateSort("clear");
    setPrioritySort("clear");
    if (selectedOption === "clear"){
      setBugsToRender(allBugs);
    }
    else{
      setBugsToRender(filterByActive(allBugs, (selectedOption === "true")));
    }
  }

  const onSortByDate = (event) => {
    setPrioritySort("clear");
    setDateSort(event.target.value);
    setBugsToRender(sortByDate(bugsToRender, (event.target.value === "newestFirst")));
  }

  const onSortByPriority = (event) => {
    setDateSort("clear");
    setPrioritySort(event.target.value);
    setBugsToRender(sortByPriority(bugsToRender, (event.target.value === "highestFirst")));
  }

  return (
    <div className='ml-72 pt-24 pb-16 pr-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-gray-950 min-h-screen'>

    <div className='max-w-7xl mx-auto'>

    <div className='mb-10 animate-slide-down'>
      <h1 className="text-5xl font-bold bg-gradient-orange bg-clip-text text-transparent">All Issues</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">Manage and track all reported issues</p>
      <div className='h-1 w-16 bg-gradient-orange rounded-full mt-4'></div>
    </div>

    <div className={`${isAddingBug == true ? 'backdrop-blur-xl' : ''}`}>
    <div className="flex flex-col dark:text-white">
      
      {/* Filters Section */}
      <div className="mb-6 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <GrFilter className="text-orange-500" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Filter by:</span> 
          </div>
          <select value={priorityFilter} onChange={onFilterByPriority} className="filter-dropdown">
            <option value="clear" disabled hidden>
              Priority
            </option>
            <option value="clear">show all</option>
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
          <select value={activeFilter} onChange={onFilterByActive} className="filter-dropdown">
            <option value="clear" disabled hidden>
              Status
            </option>
            <option value="clear">show all</option>
            <option value="true">open</option>
            <option value="false">closed</option>
          </select>

          <div className="ml-auto flex items-center gap-2">
            <MdSort className="text-orange-500" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sort by:</span>
          </div>
          <select value={dateSort} onChange={onSortByDate} className="filter-dropdown">
            <option value="clear" disabled hidden>
              Date
            </option>
            <option value="newestFirst">newest first</option>
            <option value="oldestFirst">oldest first</option>
          </select>
          <select value={prioritySort} onChange={onSortByPriority} className="filter-dropdown">
            <option value="clear" disabled hidden>
              Priority
            </option>
            <option value="highestFirst">highest first</option>
            <option value="lowestFirst">lowest first</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="-my-2 overflow-x-auto shadow-xl rounded-2xl border border-gray-100 dark:border-gray-800">
        <div className="py-2 align-middle inline-block min-w-full px-6">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="table-header dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-widest"
                >
                  Assignees
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-widest"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-widest"
                >
                  Priority
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-widest"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-widest"
                >
                  Reporter
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-widest"
                >
                  Date
                </th>
                <th scope="col" className="relative px-6 py-4">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
              <BugRows
              bugsToRender={bugsToRender}
              isEditing={isEditing}
              checked={checked}
              handleOnChange={handleOnChange}
              handleToggleActive={handleToggleActive}
              removeBug={removeBug}
              handleChangePriority={handleChangePriority}
              onAddAssignee={onAddAssignee}
              allUsers={allUsers}
              addUserFieldValue={addUserFieldValue}
              onRemoveAssignee={onRemoveAssignee}
              />
            </tbody>
          </table>
        </div>
      </div>

      {/* End Table Section */}
    </div>
    </div>

    {/* End main content wrapper divs */}
    </div>
    </div>
  );
};


export default BugTable;