declare module "vue/types/vue" {
  interface Vue {
    readonly $api: any
    readonly $logger: any
  }
}