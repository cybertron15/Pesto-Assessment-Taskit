import { Filter, Power } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Tasks from "./Tasks"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
type Task = {
	id: string,
	task: string,
	time: string,
	status: string,
	description: string
  
}
function TodoList() {
	type Checked = DropdownMenuCheckboxItemProps["checked"]
	const [filterAll, setfilterAll] = useState<Checked>(true)
	const [filterInProgress, setfilterInProgress] = useState<Checked>(false)
	const [filterTodo, setfilterTodo] = useState<Checked>(false)
	const [filterDone, setfilterDone] = useState<Checked>(false)
	const [tasks, settasks] = useState<Task[]>([
		{
		  id: "1",
		  task: 'Submit Project Report',
		  time: 'Mon, Jun 10 2024 at 9:00 AM',
		  status: 'In Progress',
		  description: 'Complete the final project report and submit it to the project manager.'
		},
		{
		  id: "2",
		  task: 'Team Meeting',
		  time: 'Tue, Jun 11 2024 at 11:00 AM',
		  status: 'Done',
		  description: 'Discuss project milestones and next steps with the team.'
		},
		{
		  id: "3",
		  task: 'Code Review',
		  time: 'Wed, Jun 12 2024 at 2:00 PM',
		  status: 'Todo',
		  description: 'Review the latest code commits and provide feedback to the developers.'
		},
		{
		  id: "4",
		  task: 'Client Presentation',
		  time: 'Thu, Jun 13 2024 at 4:00 PM',
		  status: 'In Progress',
		  description: 'Prepare and present the project progress to the client.'
		},
		{
		  id: "5",
		  task: 'Design Mockups',
		  time: 'Fri, Jun 14 2024 at 1:00 PM',
		  status: 'Done',
		  description: 'Create design mockups for the new feature and share them with the team.'
		},
		{
		  id: "6",
		  task: 'Update Documentation',
		  time: 'Sat, Jun 15 2024 at 3:00 PM',
		  status: 'Todo',
		  description: 'Update the project documentation to reflect recent changes.'
		},
		{
		  id: "7",
		  task: 'Sprint Planning',
		  time: 'Sun, Jun 5 2024 at 10:00 AM',
		  status: 'In Progress',
		  description: 'Plan the tasks and goals for the upcoming sprint with the team.'
		},
		{
		  id: "8",
		  task: 'Bug Fixes',
		  time: 'Mon, Jun 17 2024 at 5:00 PM',
		  status: 'Done',
		  description: 'Fix critical bugs reported by the QA team.'
		},
		{
		  id: "9",
		  task: 'Performance Testing',
		  time: 'Tue, Jun 18 2024 at 3:00 PM',
		  status: 'Todo',
		  description: 'Conduct performance testing on the new release and document the results.'
		},
		{
		  id: "10",
		  task: 'Code Deployment',
		  time: 'Wed, Jun 19 2024 at 12:00 PM',
		  status: 'Todo',
		  description: 'Deploy the latest version of the code to the production environment.'
		}
	  ])
	const [preparedTasks, setpreparedTasks] = useState(tasks)
	const [filter, setfilter] = useState<string | null>(null)
	
	useEffect(() => {
		function filterTasks(){
			// setting filter states
			switch (filter) {
				case "Todo":
					setfilterAll(false)
					setfilterTodo(true)
					setfilterInProgress(false)
					setfilterDone(false)
					break;
				
				case "In Progress":
					setfilterAll(false)
					setfilterTodo(false)
					setfilterInProgress(true)
					setfilterDone(false)
					break;
	
				case "Done":
					setfilterAll(false)
					setfilterTodo(false)
					setfilterInProgress(false)
					setfilterDone(true)
					break;
				default:
					setfilterAll(true)
					setfilterTodo(false)
					setfilterInProgress(false)
					setfilterDone(false)
					break;
			}
			if (filter !== null){
				const preparedTasks = tasks.filter(item => item.status.toLowerCase() === filter.toLowerCase());
				setpreparedTasks(preparedTasks)
			}
			else{
				setpreparedTasks(tasks)
			}
		}
		filterTasks()
	}, [filter, tasks])
	
	const handleTaskStatusChange = (id: string, status:string) =>{
		const updatedTasks = tasks.map((task)=>{
			return task.id === id?
				 {...task, status: status} : task
		})
		settasks(updatedTasks)
	}
	
	return (

		<div className="h-full w-full bg-white rounded-lg flex shadow-xl">
			<div className="flex flex-col basis-1/2 bg-green-700 rounded-s-lg px-4 py-2 h-full">
				<div className="flex justify-between items-center">
					<div className="text-white text-4xl">
						Taskit
					</div>
					<Power className="hover:text-red-400 cursor-pointer text-green-400" />
				</div>
				<div className="flex flex-col h-full pt-[30%] items-center">
					<div>
						<h2 className="text-white text-2xl mb-2">
							Create Tasks
						</h2>
						<form className="flex flex-col gap-2 w-72">
							<input type="text" placeholder="Task" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
							<input type="text" placeholder="Description" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
							<input type="datetime-local" placeholder="" className="bg-none rounded-lg text-lg px-2 py-1 text-gray-400" required />
							<input type="submit" value="Add Task" className="bg-green-600 rounded-lg text-lg px-2 py-1 text-white cursor-pointer" required />
						</form>
					</div>
				</div>
			</div>
			<div className="flex-1">
				<div className="px-4 py-2 h-full w-full">
					<div className="flex w-full justify-between items-center">
						<div className="text-4xl text-green-600">
							Tasks
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild className="cursor-pointer">
								<Filter className="mt-2 text-slate-400" />
								</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuCheckboxItem checked={filterAll} onClick={()=>{
									setfilter(null)
								}}>All</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem checked={filterTodo}  onClick={()=>{
									setfilter("Todo")
								}}>Todo</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem checked={filterInProgress}  onClick={()=>{
									setfilter("In Progress")
								}}>In Progress</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem checked={filterDone}  onClick={()=>{
									setfilter("Done")
								}}>Done</DropdownMenuCheckboxItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<hr className="border-t-2 my-2" />
					<ScrollArea className="h-[90%] w-full px-2">
						{
							preparedTasks.map((task) => {
								return <Accordion type="single" key={task.id} collapsible className="border-b-2 px-2 mb-2">
									<AccordionItem value={"test"}>
										<AccordionTrigger>
											<Tasks task={task.task} time={task.time} status={task.status} id={task.id} onStatusChange={handleTaskStatusChange} />
										</AccordionTrigger>
										<AccordionContent className="px-1">
											<div className="font-medium">
												Description
											</div>
											<div className="text-slate-600">
												{task.description}
											</div>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							})
						}
					</ScrollArea>

				</div>
			</div>

		</div>

	)
}

export default TodoList