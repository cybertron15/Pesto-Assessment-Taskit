import React, { useEffect, useState } from "react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { formatDate } from "@/utils/dateParseUtil";
import Edit from "./Edit";
import titleCase from "@/utils/titleCaseUtil";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";

type Props = {
    id: string;
    task: string;
    time: string;
    desciption: string;
    status: string;
    onStatusChange: (id: string, newStatus: string) => void
};
type Checked = DropdownMenuCheckboxItemProps["checked"]

function Tasks({
    id,
    task,
    time,
    status,
    desciption,
    onStatusChange
}: Props) {
    const [Todo, setTodo] = useState<Checked>(false)
    const [InProgress, setInProgress] = useState<Checked>(false)
    const [Done, setDone] = useState<Checked>(false)
    const [Taskstatus, setTaskstatus] = useState(status)



    async function updateStatus(taskStatus: string) {
            const status = taskStatus
            try {
                await axiosInstance.put(`/taskstatus/${id}`, {status});
                toast(`Status for ${task} updated`)
    
            } catch (error) {
                toast(`Failed to update status for ${task}`)
                console.error('Error Editing Task', error);
            }
        }

    useEffect(() => {
        switch (Taskstatus) {
            case "Todo":
                setTodo(true)
                setInProgress(false)
                setDone(false)
                break;
            case "In Progress":
                setTodo(false)
                setInProgress(true)
                setDone(false)
                break;
            case "Done":
                setTodo(false)
                setInProgress(false)
                setDone(true)
                break
        }
    }, [Taskstatus])

    return (
        <div
            className=" flex justify-between items-center p-1 w-full"
        >
            <div className=" flex flex-col">
                <TooltipProvider >
                    <Tooltip>
                        <div className=" flex items-center gap-1.5">
                            <TooltipTrigger className="text-lg md:text-xl font-Inter truncate ... max-w-36 md:max-w-48 text-start">
                                {titleCase(task)}
                            </TooltipTrigger>
                            <Edit id={id} task={task} desciption={desciption} time={time} />
                        </div>
                        <TooltipContent className="bg-slate-600">{task}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <div className="text-xs text-slate-400 text-start">
                    {formatDate(time)}
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    <button type="button" className={`${Taskstatus === "Done" && "bg-green-500"} ${Taskstatus === "In Progress" && "border border-green-500 animate-pulse"} ${Taskstatus === "Todo" && "border border-green-500"} w-24 p-1 rounded-lg`}>
                        {Taskstatus}
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuCheckboxItem checked={Todo} onClick={(event) => {
                        onStatusChange(id, "1")
                        setTaskstatus("Todo")
                        updateStatus("1")
                        event.stopPropagation() // stopping event propagation to prevent accordion trigger
                    }}>Todo</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={InProgress} onClick={(event) => {
                        onStatusChange(id, "2")
                        setTaskstatus("In Progress")
                        updateStatus("2")
                        event.stopPropagation()
                    }}>In Progress</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={Done} onClick={(event) => {
                        onStatusChange(id, "3")
                        setTaskstatus("Done")
                        updateStatus("3")
                        event.stopPropagation()
                    }}>Done</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default Tasks;
