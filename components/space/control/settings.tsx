'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Users, Eye, Copy, UserPlus, X, Globe, Lock, Edit3, Puzzle, AlertCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { AllModules } from '@/modules/types';
import { updateSpaceName, addAllowedUser, removeAllowedUser, changeVisibility, deleteSpace } from '@/lib/supabase/space';
import { Tables } from '@/database.types';

export default function SettingsEditor({
    spaceUserId,
    spaceSettings,
}: {
    spaceUserId: string;
    spaceSettings: Tables<'space'>;
}) {
    const [name, setName] = useState(spaceSettings.name);
    const [shareInput, setShareInput] = useState('');
        const [pending, setPending] = useState(false);
        const [privacy, setPrivacy] = useState(spaceSettings.is_public);
        const [users, setUsers] = useState(spaceSettings.allowed_users);
        const [deletePending, setDeletePending] = useState(false);
        const [deleteError, setDeleteError] = useState<string | null>(null);
        const [shareError, setShareError] = useState<string | null>(null);

    const publicLink = `${window.location.origin}/space/${spaceSettings.space_id}`;

    // TODO: it doesnt instantly update values
    async function handleDeleteSpace() {
        if (!confirm('Are you sure you want to delete this space? This action cannot be undone.')) return;
        setDeletePending(true);
        setDeleteError(null);
        try {
            await deleteSpace(spaceSettings.space_id, spaceUserId);
            // Optionally redirect or update UI after deletion
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
        setPending(true);
        await updateSpaceName(spaceSettings.space_id, name, spaceUserId);
        setPending(false);
    }

    async function handlePrivacyChange(newPrivacy: boolean) {
        setPending(true);
        await changeVisibility(spaceSettings.space_id, newPrivacy, spaceUserId);
        setPrivacy(newPrivacy);
        setPending(false);
    }

    // TODO: display shared users as actual names instead of raw IDs
    async function handleShare() {
        setPending(true);
        setShareError(null);
        try {
            await addAllowedUser(spaceSettings.space_id, shareInput, spaceUserId);
            setUsers([...users, shareInput]);
            setShareInput('');
        } catch (err: unknown) {
            setShareError('Failed to share with user.');
        }
        setPending(false);
    }

    async function handleRemoveUser(user: string) {
        setPending(true);
        await removeAllowedUser(spaceSettings.space_id, user, spaceUserId);
        setUsers(users.filter((u: string) => u !== user));
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
                            disabled={pending || name === spaceSettings.name} 
                            onClick={handleNameChange}
                            className="px-6"
                        >
                            {pending ? 'Saving...' : 'Save'}
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
                    <div className="space-y-3">
                        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Visibility</h4>
                        <div className="flex gap-3">
                            <Button
                                variant={!privacy ? 'default' : 'outline'}
                                disabled={pending}
                                onClick={() => handlePrivacyChange(false)}
                                className="flex items-center gap-2 flex-1 justify-center"
                            >
                                <Lock className="size-4" /> 
                                <span>Private</span>
                            </Button>
                            <Button
                                variant={privacy ? 'default' : 'outline'}
                                disabled={pending}
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

                    {/* Specific User Sharing */}
                    <div className="space-y-3">
                        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Invite Users</h4>
                        <div className="flex gap-2">
                            <Input
                                value={shareInput}
                                onChange={e => setShareInput(e.target.value)}
                                placeholder="Username or email address"
                                className="flex-1"
                            />
                            <Button 
                                disabled={pending || !shareInput.trim()} 
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
                        {users.length > 0 && (
                            <div className="space-y-2">
                                <span className="font-medium text-sm text-muted-foreground">Shared with ({users.length})</span>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {users.map((user: string) => (
                                        <div key={user} className="flex items-center justify-between bg-muted/30 p-2 rounded-lg border border-border/50">
                                            <div className="flex items-center gap-2">
                                                <Users className="size-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">{user}</span>
                                            </div>
                                            <Button 
                                                size="sm" 
                                                variant="ghost" 
                                                disabled={pending} 
                                                onClick={() => handleRemoveUser(user)}
                                                className="h-7 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                                            >
                                                <X className="size-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
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
