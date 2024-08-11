"use client";

import { Calendar } from "./ui/calendar";
import { Popover, PopoverTrigger } from "./ui/popover";
import { SubmitHandler, useForm } from "react-hook-form";
import addTask from "@/controllers/addTask";
import getAllMembers from "@/controllers/getAllMembers";
import { PopoverContent } from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { useMemo } from "react";
import { User } from "@prisma/client";

interface ICreateTask {
    teamId: number;
    userId: string;
    allMembers: User[]
}

interface Itask {
    title: string;
    description?: string;
    dueDate?: Date;
    assignee?: string;
}

const CreateTaskForm: React.FC<ICreateTask> = ({ teamId, userId ,allMembers}) => {
    const { register, handleSubmit } = useForm<Itask>();

    const handleAddTask: SubmitHandler<Itask> = async (data) => {
        const { title, description, dueDate, assignee } = data;
        if (teamId === -1) {
            await addTask(title, undefined, description, dueDate, userId);
        } else {
            await addTask(title, teamId, description, dueDate, assignee);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleAddTask)} className="space-y-4">
            <div>
                <label className="block text-gray-700">Title</label>
                <input
                    type="text"
                    {...register("title", { required: true })}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>
            <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                    {...register("description")}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>
            <div>
                <label className="block text-gray-700">Due Date</label>
                <Popover>
                    <PopoverTrigger>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                        >
                            Select Date
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar {...register("dueDate")} />
                    </PopoverContent>
                </Popover>
            </div>
            {teamId !== -1 && (
                <div>
                    <label className="block text-gray-700">Assignee</label>
                    <select
                        {...register("assignee")}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        {allMembers &&
                            allMembers.map((member: any) => (
                                <option key={member.id} value={member.id}>
                                    {member.name || member.email}
                                </option>
                            ))}
                    </select>
                </div>
            )}
        </form>
    );
};

export default CreateTaskForm;
