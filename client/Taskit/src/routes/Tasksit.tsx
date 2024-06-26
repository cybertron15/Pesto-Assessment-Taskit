import { redirect } from "react-router-dom";
import TasksList from "../components/TasksList"
import { removeTokens } from "@/utils/tokenUtils";
import axiosInstance from "@/utils/axiosInstance";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { error } from "console";

  
  interface ErrorResponse {
	response: {
	  data: {
		current_password?: string[];
		new_email?: string[];
		new_username?: string[];
		new_password?: string[];
	  };
	};
  }
  
export async function action({ params, request }: { params: any, request: Request }) {
	const formData = await request.formData();
	const formType = formData.get("formType");
	const id = formData.get("id");
	const task = formData.get("task");
	const description = formData.get("description");
	const due = formData.get("due");
	const new_email = formData.get("new_email");
	const new_username = formData.get("new_username");
	const new_full_name = formData.get("new_full_name");
	const new_password = formData.get("new_password");
	const current_password = formData.get("current_password");
	console.log(formType);
	console.log(due);
	
	if (formType === "logout") {
		removeTokens();
		return redirect('/login');
	}

	if (formType === "create") {
		try {
			await axiosInstance.post('/tasks/', { task, description, due });
			toast('Task added')
			return 'success'

		} catch (error) {
			toast('Failed to Create task')
			console.error('Error Creating task', error);
			return 'fail'
		}
	}

	if (formType === "edit") {
		try {
			await axiosInstance.put(`/tasks/${id}`, { task, description, due });
			toast('Task Edited')
			return 'success'

		} catch (error) {
			toast('Failed to Edit Task')
			console.error('Error Editing Task', error);
			return 'fail'
		}
	}

	if (formType === "delete") {
		try {
			const res = await axiosInstance.delete(`/tasks/${id}`);
			console.log(res);
			
			toast('Task Deleted')
			return 'success'

		} catch (error) {
			toast('Failed to Delete Task')
			console.error('Error Deleting Task', error);
			return 'fail'
		}
	}

	if (formType === "profile") {
		
		try {
			console.log(new_username,new_full_name,new_email,new_password,current_password);
			let data = {}
			if (new_full_name){
				data = {...data,new_full_name, current_password}
			}
			if (new_email){
				data = {...data, new_email, current_password}
			}
			if (new_username){
				data = {...data, new_username, current_password}
			}
			if (new_password){
				data = {...data, new_password, current_password}
			}
			const res = await axiosInstance.put(`/update-sensitive/`,data);
			console.log(res);
			
			toast('User data updated')
			return 'success'

		} catch (error) {
			const err = error as ErrorResponse;
			if (err.response.data.current_password){
				toast(err.response.data.current_password[0])
			}
			if (err.response.data.new_email){
				toast(err.response.data.new_email[0])
			}
			if (err.response.data.new_username){
				toast(err.response.data.new_username[0])
			}
			if (err.response.data.new_password){
				toast(err.response.data.new_password[0])
			}
			new_password
			// toast('Failed to update user data')
			console.error('Error updating user data', error);
			return 'fail'
		}
	}
	return null
}

export async function loader() {
	const token = localStorage.getItem('accessToken');
	if (token === null) { return redirect('/login') }
	try {
		const response = await axiosInstance.get('/tasks/');
		console.log(response.data);
		
		return response.data
	} catch (error) {
		toast('Error fetching data')
		console.error('Error fetching data', error);
		return null
	}
}

function Taskit() {
	return (
		<div className="flex justify-center items-center h-svh w-full">

			<div className="w-full h-full lg:py-10 lg:px-[12%] xl:px-[20%]">
				<TasksList />
			</div>

			<Toaster />
		</div>
	)
}

export default Taskit