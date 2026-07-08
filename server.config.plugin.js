from tutor import hooks

hooks.Filters.ENV_PATCHES.add_item(
    (
        "mfe-env-config-runtime-definitions-searn-lms",
        """
// Runtime plugin configuration injected by Tutor (searn-lms feedback slot)

const { PLUGIN_OPERATIONS, DIRECT_PLUGIN } = await import('@openedx/frontend-plugin-framework');
const { default: Feedback } = await import('./src/plugin-slots/feedback');

{% raw %}
const getPluginSlots = () => {
  return {
    feedback_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'feedback_plugin_slot',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <Feedback {...props} />,
          },
        },
      ],
    },
  };
};

// Attach plugin slots to runtime config
config.pluginSlots = getPluginSlots();
{% endraw %}
"""
    )
)
