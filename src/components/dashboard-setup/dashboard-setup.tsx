'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CreateWorkspaceFormSchema } from '@/lib/types'

import Loader from '@/components/global/Loader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Subscription } from '@/lib/supabase/types'
import { AuthUser } from '@supabase/supabase-js'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import EmojiPicker from '../global/emoji-picker'

interface DashboardSetupProps {
  user: AuthUser
  subscription: Subscription | null
}

function DashboardSetup({ subscription, user }: DashboardSetupProps) {
  const [selectedEmoji, setSelectedEmoji] = useState('💼')

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: isLoading, errors },
  } = useForm<z.infer<typeof CreateWorkspaceFormSchema>>({
    mode: 'onChange',
    defaultValues: {
      logo: '',
      workspaceName: '',
    },
  })

  const onSubmit: SubmitHandler<
    z.infer<typeof CreateWorkspaceFormSchema>
  > = async (value) => {}

  return (
    <Card
      className="h-screen
      w-[800px]
      sm:h-auto
  "
    >
      <CardHeader>
        <CardTitle>Create A Workspace</CardTitle>
        <CardDescription>
          Lets create a private workspace to get you started.You can add
          collaborators later from the workspace settings tab.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div
              className="flex
            items-center
            gap-4"
            >
              <div className="text-5xl">
                <EmojiPicker getValue={(emoji) => setSelectedEmoji(emoji)}>
                  {selectedEmoji}
                </EmojiPicker>
              </div>
              <div className="w-full ">
                <Label
                  htmlFor="workspaceName"
                  className="text-sm
                  text-muted-foreground
                "
                >
                  Name
                </Label>
                <Input
                  id="workspaceName"
                  type="text"
                  placeholder="Workspace Name"
                  disabled={isLoading}
                  {...register('workspaceName', {
                    required: 'Workspace name is required',
                  })}
                />
                <small className="text-red-600">
                  {errors?.workspaceName?.message?.toString()}
                </small>
              </div>
            </div>
            <div>
              <Label
                htmlFor="logo"
                className="text-sm
                  text-muted-foreground
                "
              >
                Workspace Logo
              </Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                placeholder="Workspace Name"
                // disabled={isLoading || subscription?.status !== 'active'}
                {...register('logo', {
                  required: false,
                })}
              />
              <small className="text-red-600">
                {errors?.logo?.message?.toString()}
              </small>
              {subscription?.status !== 'active' && (
                <small
                  className="
                  block
                  text-muted-foreground
              "
                >
                  To customize your workspace, you need to be on a Pro Plan
                </small>
              )}
            </div>
            <div className="self-end">
              <Button disabled={isLoading} type="submit">
                {!isLoading ? 'Create Workspace' : <Loader />}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default DashboardSetup
