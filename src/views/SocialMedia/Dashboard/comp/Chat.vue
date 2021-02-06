<template>
    <div class="neu-glow" style="height:800px !important">
        <v-row>
            <v-col md="4" style="height:800px !important">
                <user-list-nav
                        :drawer="drawer"
                        :items="filteredGroup"
                        :clicked="switchGroup"
                        :activeId="activeGroupId"
                        :onToggle="drawerHandler"
                >
                    <v-text-field
                            v-model="search"
                            label="Search User"
                            solo
                            dense
                            flat
                            prepend-icon="search"
                            hide-details
                    ></v-text-field>
                </user-list-nav>
                <v-divider></v-divider>
            </v-col>
            <v-col md="8" class="pl-0 ml-0" style="height:800px !important; overflow-y: auto !important">
                <div>
                    <chat-toolbar
                            :drawer="drawer"
                            :group="activeGroup"
                            :onToggleDrawer="drawerHandler"
                    />
                </div>
                <v-divider></v-divider>
                <div>
                    <div class="scrollable-content " ref="conversations">
                        <v-card-text>
                            <v-slide-y-transition group tag="div" class="row">
                                <v-col cols="12" v-for="(thread, index) in chat" :key="index">
                                    <v-sheet
                                            color="transparent"
                                            class="d-flex"
                                            :class="[
                  authUser.id === thread.user.id
                    ? 'flex-row-reverse'
                    : 'flex-row',
                ]"
                                    >
                                        <div>
                                            <v-avatar size="40px" color="grey lighten-4">
                                                <img :src="thread.user.avatar" :alt="thread.user.name" />
                                            </v-avatar>
                                        </div>
                                        <v-sheet
                                                class="mx-3 pa-3"
                                                :class="
                    authUser.id === thread.user.id
                      ? 'neu-glow-inset rounded'
                      : 'rounded'
                  "
                                        >
                                            <div v-html="thread.message"></div>
                                        </v-sheet>
                                    </v-sheet>
                                </v-col>
                            </v-slide-y-transition>
                        </v-card-text>
                    </div>
                    <div>
                        <v-textarea
                                class="chat-input"
                                name="message"
                                ref="sendMessageText"
                                placeholder="Write your message ..."
                                auto-grow
                                outlined
                                solo
                                rows="1"
                                full-width
                                hide-details
                                append-icon="fa-paper-plane"
                                v-model="chatMessageEditor"
                                @click:append="sendMessage"
                        ></v-textarea>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import { groupBy, find } from "lodash";
    import { groups, conversation, authUser, users } from "@/data/dummyData";
    import UserListNav from "@/views/SocialMedia/Dashboard/comp/partial/UserListNav";
    import ChatToolbar from "@/views/SocialMedia/Dashboard/comp/partial/ChatToolbar";

    export default {
        components: {
            UserListNav,
            ChatToolbar,
        },
        data() {
            return {
                page: "Chat",
                search: "",
                drawer: true,
                activeGroupId: 1,
                authUser,
                // Chat is always a group of members. For personal chat, it's restricted members (Only 2 members)
                // For personal chat, we just fetch other user's information to display in the list
                groups,
                // Get All conversation where auth user is member of the group
                // Not, conversation needs to be group by GroupID that's is.
                // For new, message push message on conversation object
                // It will automatically, manage the rest of the things.
                conversation,
                chatMessageEditor: null,
                timeout: null,
            };
        },
        mounted() {
            const date = new Date();
            const createdAt = date.getTime();
            clearTimeout(this.timeout);
            this.$nextTick(() => {
                this.timeout = setTimeout(() => {
                    this.conversation.push({
                        group_id: 7,
                        user_id: 9,
                        user: users[8],
                        message:
                            "Hey, please check new design. It's really amazing. Hope you love it",
                        created_at: createdAt,
                        read: false,
                    });
                }, 5000);
            });
        },
        computed: {
            conversationGroup() {
                return groupBy(this.conversation, "group_id");
            },
            activeGroup() {
                return find(this.groups, { id: this.activeGroupId });
            },
            chat() {
                const group = this.activeGroupId;
                return this.conversationGroup[group];
            },
            filteredGroup() {
                const groups = this.groups.map((group) => {
                    const lastMsg =
                        this.conversationGroup[group.id] !== undefined
                            ? this.conversationGroup[group.id].slice(-1).pop()
                            : null;
                    return {
                        ...group,
                        msgOn: lastMsg ? lastMsg.created_at : 0,
                        lastMsg,
                    };
                });
                return groups.filter((member) =>
                    member.user.name.toLowerCase().includes(this.search.toLowerCase())
                );
            },
        },
        methods: {
            switchGroup(group) {
                // const ps = document.querySelector("#chatscrollstatesetter");
                // ps.scrollTop = 0;
                this.activeGroupId = group.id;
                // this.$nextTick(() => {
                //   ps.scrollTop = ps.scrollHeight;
                // });
            },
            drawerHandler() {
                this.drawer = !this.drawer;
            },
            sendMessage() {
                const activeGroup = this.activeGroup;
                const authUser = this.authUser;
                const date = new Date();
                const createdAt = date.getTime();
                this.conversation.push({
                    group_id: activeGroup.id,
                    user_id: authUser.id,
                    user: authUser,
                    message: this.chatMessageEditor,
                    created_at: createdAt,
                    read: true,
                });
                this.chatMessageEditor = null;
                this.$nextTick(() => {
                    const container = this.$refs.conversations;
                    container.scrollTop = container.scrollHeight;
                });
            },
        },
        beforeDestroy() {
            clearTimeout(this.timeout);
            this.groups = null;
            this.conversation = null;
            delete this.groups;
            delete this.conversation;
        },
    };
</script>
