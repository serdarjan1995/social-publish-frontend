<template>
    <v-card-text class="pt-0">
        <v-data-table
                :headers="headers"
                :items="items"

                class="neu-glow-inset"
        >
            <template v-slot:item="{ item }">
                <tr>
                    <td>{{ item.type }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.id }}</td>
                    <td>{{ item.amount }}</td>
                    <td>{{ item.created }}</td>
                </tr>
            </template>
        </v-data-table>
    </v-card-text>
</template>

<script>
    export default {
        props: {
            items: {
                type: Array
            },
            headers: {
                type: Array
            }
        }
    };
</script>
