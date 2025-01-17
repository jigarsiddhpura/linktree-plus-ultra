"use client"

import { useState } from "react"
import { Button } from "@nextui-org/button"
import { Input, Textarea } from "@nextui-org/input"
import { Progress } from "@nextui-org/progress"
import { Avatar } from "@nextui-org/avatar"
import { useRouter } from "next/navigation"
import { Plus } from 'lucide-react'
import Link from "next/link"

// interface ProfileData {
//     username: string
//     title: string
//     bio: string
//     profileImage: string
// }

const sampleAvatars = [
    { url: "https://ugc.production.linktr.ee/bb3de458-6172-49a8-9e25-067bf171ba6b_untitled.webp?io=true&size=avatar", color: "bg-blue-400" },
    { url: "https://ugc.production.linktr.ee/1e8f6d16-f479-4361-8944-1445fcf69d70_untitled.webp?io=true&size=avatar", color: "bg-red-400" },
    { url: "https://ugc.production.linktr.ee/b73b4296-f8da-43e3-89c7-3fd8ddc5bee3_untitled.webp?io=true&size=avatar", color: "bg-green-400" },
]

export default function ProfileSetup({ params }) {
    const router = useRouter()
    const [selectedAvatar, setSelectedAvatar] = useState(null)
    const [formData, setFormData] = useState({
        username: params.username,
        title: "",
        bio: "",
        profileImage: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const userId = localStorage.getItem("userId");
            const response = await fetch('http://localhost:8080/api/profile/05ef3392-add0-4f12-8b68-ce98d408134c/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    title: formData.title,
                    bio: formData.bio,
                    profileImage: formData.profileImage || sampleAvatars[selectedAvatar || 0]?.url
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to create profile')
            }

            const data = await response.json()
            router.push('/admin') // Redirect to dashboard after successful creation
        } catch (error) {
            console.error('Error creating profile:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen grid grid-cols-1 gap-6 p-6">
            {/* Header */}
            <header className="flex justify-between items-center">
                <Button
                    as={Link}
                    href="/new-profile/username"
                    variant="light"
                >
                    Back
                </Button>
                <Progress
                    value={66}
                    className="max-w-xs"
                    color="secondary"
                />
                <Button
                    as={Link}
                    href="/dashboard"
                    variant="light"
                >
                    Skip
                </Button>
            </header>

            {/* Main Content */}
            <main className="max-w-md mx-auto w-full space-y-8">
                <h1 className="text-4xl font-bold text-center">
                    Add profile details
                </h1>

                {/* Profile Image Selection */}
                <div className="space-y-4">
                    <p className="text-center">Select a profile image</p>
                    <div className="flex justify-center gap-4">
                        {sampleAvatars.map((avatar, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedAvatar(index)}
                                className={`relative rounded-full p-1 ${selectedAvatar === index ? 'ring-2 ring-purple-600' : ''
                                    }`}
                            >
                                <Avatar
                                    src={avatar.url}
                                    className={`w-16 h-16 ${avatar.color}`}
                                />
                            </button>
                        ))}
                        <button
                            onClick={() => {/* Handle custom upload */ }}
                            className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                        >
                            <Plus className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Profile Information */}
                <div className="space-y-6">
                    <p className="text-center">Add title and bio</p>
                    <Input
                        label="Profile title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        variant="bordered"
                    />
                    <Textarea
                        label="Bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        variant="bordered"
                        maxRows={3}
                        maxLength={80}
                        endContent={
                            <div className="absolute bottom-1 right-1 text-small text-default-400">
                                {formData.bio?.length || 0}/80
                            </div>
                        }
                    />
                </div>

                {/* Continue Button */}
                <Button
                    className="w-full bg-purple-600 text-white"
                    size="lg"
                    radius="full"
                    isLoading={isLoading}
                    onPress={handleSubmit}
                >
                    Continue
                </Button>
            </main>

            {/* Footer */}
            <footer className="fixed bottom-6 left-6">
                <Button
                    variant="light"
                    className="text-gray-500 text-sm"
                >
                    Cookie preferences
                </Button>
            </footer>
        </div>
    )
}

