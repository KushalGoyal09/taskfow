import { auth } from "@clerk/nextjs/server";
import CreateTaskForm from "./CreateTaskForm";
import React, { useMemo } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import findTeam from "@/controllers/findTeam";
import { Team } from "@prisma/client";
import { Button } from "./ui/button";
import getAllMembers from "@/controllers/getAllMembers";

interface ICreateTask {
    teamId: number;
}

const CreateTask: React.FC<ICreateTask> = async ({ teamId }) => {
    const { userId } = auth();
    if (!userId) {
        return null;
    }

    let team: Team | null = null;
    if (teamId !== -1) {
        team = await findTeam(teamId);
    }

    const allMembers = await getAllMembers(teamId);

    return (
        <Card className="max-w-lg mx-auto my-8 shadow-lg rounded-lg border border-gray-200">
            <CardHeader className="bg-blue-500 text-white p-4 rounded-t-lg">
                <CardTitle className="text-xl font-semibold">
                    Create a Task
                </CardTitle>
                <CardDescription>
                    {teamId === -1 ? <p>Individual</p> : <p>{team?.name}</p>}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <CreateTaskForm
                    teamId={teamId}
                    userId={userId}
                    allMembers={allMembers}
                />
            </CardContent>
            <CardFooter className="p-4 bg-gray-50 rounded-b-lg">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    Add Task
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CreateTask;
