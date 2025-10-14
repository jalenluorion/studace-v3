'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Users, Eye, Copy, UserPlus, X, Globe, Lock, Edit3, Puzzle, AlertCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { AllModules } from '@/modules/types';
import { updateSpaceName, addAllowedUser, removeAllowedUser, changeVisibility, deleteSpace, getUsernamesFromIds } from '@/lib/supabase/space';
import { Tables } from '@/database.types';
import { space } from 'postcss/lib/list';
import router from 'next/router';

export default function SettingsEditor({
    spaceUserId,
    spaceSettings,
    setSpaceName,
}: {
    spaceUserId: string;
    spaceSettings: Tables<'space'>;
    setSpaceName: (name: string) => void;
}) {
    const [name, setName] = useState(spaceSettings.name);
    const [namePending, setNamePending] = useState(false);
    const [shareInput, setShareInput] = useState('');
    const [privacyPending, setPrivacyPending] = useState(false);
    const [sharePending, setSharePending] = useState(false);
    const [pending, setPending] = useState(false);
    const [privacy, setPrivacy] = useState(spaceSettings.is_public);
    const [users, setUsers] = useState<Array<{user_id: string, username: string}>>([]);
    const [owner, setOwner] = useState<{user_id: string, username: string} | null>(null);
    const [usersLoading, setUsersLoading] = useState(true);
    const [deletePending, setDeletePending] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [shareError, setShareError] = useState<string | null>(null);

    const publicLink = `${window.location.origin}/space/${spaceSettings.space_id}`;

    useEffect(() => {
        const loadUsernames = async () => {
            // Load owner information
            if (spaceSettings.owner_id) {
                try {
                    const ownerProfiles = await getUsernamesFromIds([spaceSettings.owner_id]);
                    if (ownerProfiles.length > 0) {
                        setOwner(ownerProfiles[0]);
                    }
                } catch (error) {
                    console.error('Failed to load owner:', error);
                }
            }

            // Load shared users
            if (spaceSettings.allowed_users && spaceSettings.allowed_users.length > 0) {
                try {
                    const userProfiles = await getUsernamesFromIds(spaceSettings.allowed_users);
                    setUsers(userProfiles);
                } catch (error) {
                    console.error('Failed to load usernames:', error);
                }
            }
            setUsersLoading(false);
        };

        loadUsernames();
    }, [spaceSettings.allowed_users, spaceSettings.owner_id]);

    async function handleDeleteSpace() {
        if (!confirm('Are you sure you want to delete this space? This action cannot be undone.')) return;
        setDeletePending(true);
        setDeleteError(null);
        try {
            await deleteSpace(spaceSettings.space_id, spaceUserId);
            // Optionally redirect or update UI after deletion
            router.push('/');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setDeleteError(err.message);
            } else {
                setDeleteError('Failed to delete space.');
            }
        }
        setDeletePending(false);
    }

    async function handleNameChange() {
        setNamePending(true);
        spaceSettings.name = await updateSpaceName(spaceSettings.space_id, name, spaceUserId);
        setSpaceName(name);
        setNamePending(false);
    }

    async function handlePrivacyChange(newPrivacy: boolean) {
        setPrivacyPending(true);
        spaceSettings.is_public = await changeVisibility(spaceSettings.space_id, newPrivacy, spaceUserId);
        setPrivacy(newPrivacy);
        setPrivacyPending(false);
    }

    async function handleShare() {
        setSharePending(true);
        setShareError(null);
        try {
            const newAllowedUsers = await addAllowedUser(spaceSettings.space_id, shareInput, spaceUserId);
            spaceSettings.allowed_users = newAllowedUsers;  
            // Refresh usernames after adding user
            const userProfiles = await getUsernamesFromIds(newAllowedUsers);
            setUsers(userProfiles);
            setShareInput('');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setShareError(err.message);
            } else {
                setShareError('Failed to share with user.');
            }
        }
        setSharePending(false);
    }

    async function handleRemoveUser(userId: string) {
        setPending(true);
        try {
            const newAllowedUsers = await removeAllowedUser(spaceSettings.space_id, userId, spaceUserId);
            spaceSettings.allowed_users = newAllowedUsers;
            // Refresh usernames after removing user
            const userProfiles = await getUsernamesFromIds(newAllowedUsers);
            setUsers(userProfiles);
        } catch (error) {
            console.error('Failed to remove user:', error);
        }
        setPending(false);
    }

    return (
        <Card className="max-w-2xl max-h-[95vh] overflow-hidden">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <CardTitle>
                        <DialogTitle>Space Settings</DialogTitle>
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-3 overflow-auto">
                {/* Space Name Section */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Edit3 className="size-4 text-muted-foreground" />
                        <h3 className="font-semibold text-lg">Space Name</h3>
                    </div>
                    <div className="flex gap-2">
                        <Input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Enter space name"
                            className="flex-1"
                        />
                        <Button 
                            disabled={namePending || name === spaceSettings.name} 
                            onClick={handleNameChange}
                            className="px-6"
                        >
                            {namePending ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </div>

                <Separator />

                {/* Privacy & Sharing Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Users className="size-4 text-muted-foreground" />
                        <h3 className="font-semibold text-lg">Privacy & Sharing</h3>
                    </div>
                    
                    {/* Privacy Toggle */}
                    <div className="space-y-1">
                        <h4 className="font-medium text-sm text-muted-foreground tracking-wide">Visibility</h4>
                        <div className="flex gap-3">
                            <Button
                                variant={!privacy ? 'default' : 'outline'}
                                disabled={privacyPending}
                                onClick={() => handlePrivacyChange(false)}
                                className="flex items-center gap-2 flex-1 justify-center"
                            >
                                <Lock className="size-4" /> 
                                <span>Private</span>
                            </Button>
                            <Button
                                variant={privacy ? 'default' : 'outline'}
                                disabled={privacyPending}
                                onClick={() => handlePrivacyChange(true)}
                                className="flex items-center gap-2 flex-1 justify-center"
                            >
                                <Globe className="size-4" /> 
                                <span>Public</span>
                            </Button>
                        </div>
                    </div>

                    {/* Public Link */}
                    {privacy && (
                        <div className="bg-muted/50 p-4 rounded-lg space-y-3 border border-border/50">
                            <div className="flex items-center gap-2">
                                <Eye className="size-4 text-muted-foreground" />
                                <span className="font-medium text-sm">Shareable Link</span>
                                <Badge variant="secondary" className="text-xs">Public</Badge>
                            </div>
                            <div className="flex gap-2">
                                <Input 
                                    value={publicLink} 
                                    readOnly 
                                    className="bg-background font-mono text-sm"
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                        navigator.clipboard.writeText(publicLink);
                                    }}
                                    className="shrink-0"
                                >
                                    <Copy className="size-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Specific User Sharing - Only show when private */}
                    {!privacy && (
                        <div className="space-y-1">
                            <h4 className="font-medium text-sm text-muted-foreground tracking-wide">Invite Users</h4>
                            <div className="flex gap-2">
                                <Input
                                    value={shareInput}
                                    onChange={e => setShareInput(e.target.value)}
                                    placeholder="Username or email address"
                                    className="flex-1"
                                />
                                <Button 
                                    disabled={sharePending || !shareInput.trim()} 
                                    onClick={handleShare}
                                    className="px-6"
                                >
                                    <UserPlus className="size-4 mr-2" />
                                    Invite
                                </Button>
                            </div>
                                {shareError && (
                                    <div className="text-xs text-destructive mt-1 flex items-center gap-1">
                                        <AlertCircle className="size-4" />
                                        {shareError}
                                    </div>
                                )}
                            
                            {/* Shared Users List */}
                            {(owner || users.length > 0 || usersLoading) && (
                                <div className="space-y-2">
                                    <span className="font-medium text-sm text-muted-foreground tracking-wide">People With Access</span>
                                    <div className="space-y-2 max-h-32 overflow-y-auto">
                                        {usersLoading ? (
                                            <div className="flex items-center justify-center p-4">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-muted-foreground"></div>
                                                <span className="ml-2 text-sm text-muted-foreground">Loading...</span>
                                            </div>
                                        ) : (
                                            <>
                                                {/* Owner */}
                                                {owner && (
                                                    <div className="flex items-center justify-between bg-muted/30 p-2 rounded-lg border border-border/50">
                                                        <div className="flex items-center gap-2">
                                                            <Users className="size-4 text-muted-foreground" />
                                                            <span className="text-sm font-medium">{owner.username}</span>
                                                            <span className="text-xs text-muted-foreground">(Owner)</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Shared Users */}
                                                {users.map((user: {user_id: string, username: string}) => (
                                                    <div key={user.user_id} className="flex items-center justify-between bg-muted/30 p-2 rounded-lg border border-border/50">
                                                        <div className="flex items-center gap-2">
                                                            <Users className="size-4 text-muted-foreground" />
                                                            <span className="text-sm font-medium">{user.username}</span>
                                                        </div>
                                                        <Button 
                                                            size="sm" 
                                                            variant="ghost" 
                                                            disabled={pending} 
                                                            onClick={() => handleRemoveUser(user.user_id)}
                                                            className="h-5 w-5 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                        >
                                                            <X className="size-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <Separator />

                {/* Modules Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Puzzle className="size-4 text-muted-foreground" />
                        <h3 className="font-semibold text-lg">Modules</h3>
                        <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                    </div>
                    <div className="bg-muted/30 p-6 rounded-lg border border-dashed border-border/50 text-center space-y-3">
                        <AlertCircle className="size-8 text-muted-foreground mx-auto" />
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Module customization is coming soon</p>
                            <p className="text-xs text-muted-foreground">You&apos;ll be able to add, remove, and configure modules for your space</p>
                        </div>
                        <Button 
                            variant="outline" 
                            disabled={true}
                            className="mt-4"
                        >
                            <Edit3 className="size-4 mr-2" /> 
                            Configure Modules
                        </Button>
                    </div>
                </div>
                <Separator />

                {/* Danger Zone: Delete Space */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Trash2 className="size-4 text-destructive" />
                        <h3 className="font-semibold text-lg text-destructive">Delete Space</h3>
                    </div>
                    <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/30 space-y-3">
                        <p className="text-sm text-destructive font-medium">
                            This action is irreversible. Deleting your space will remove all data and shared access.
                        </p>
                        {deleteError && (
                            <p className="text-xs text-destructive">{deleteError}</p>
                        )}
                        <Button
                            variant="destructive"
                            disabled={deletePending}
                            onClick={handleDeleteSpace}
                            className="flex items-center gap-2"
                        >
                            <Trash2 className="size-4" />
                            {deletePending ? 'Deleting...' : 'Delete Space'}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
