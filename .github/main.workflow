workflow "Build, Test, and Publish" {
  on = "push"
  resolves = [
    "Test"
  ]
}

action "Install" {
  uses = "nuxt/actions-yarn@node-10"
  args = "install"
}

action "Test" {
  needs = ["Install"]
  uses = "nuxt/actions-yarn@node-10"
  args = "test"
}
