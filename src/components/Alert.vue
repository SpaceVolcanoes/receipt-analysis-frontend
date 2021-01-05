<template>
  <div v-for="alert in alerts" :key="alert.id" :class="alert.level">
    <button @click="close(alert.id)" class="delete"></button>
    {{ alert.message }}
  </div>
</template>

<script>
export default {
  name: "Alert",
  data() {
    return {
      alerts: [],
      alertId: 0
    };
  },
  methods: {
    close: function(id) {
      this.alerts = this.alerts.filter(alert => alert.id !== id);
    }
  },
  mounted() {
    this.eventBus.on("show-alert", alert => {
      const id = this.alertId++;
      alert.id = id;
      alert.level = "notification is-" + alert.level;
      let parent = this;

      this.alerts.push(alert);

      setTimeout(() => {
        parent.close(id);
      }, 5000);
    });
  }
};
</script>
