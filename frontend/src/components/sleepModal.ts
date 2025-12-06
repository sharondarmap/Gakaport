import { getCurrentUser, sendSleep } from "../../services/userService"
import { sleepPackages } from "../../data/creators"
import type { User } from "../../data/creators"

export class SleepModal {
  private modal: HTMLElement | null = null
  private currentUser: User | null = null
  private selectedAmount = 3
  private creatorId: string
  private creatorName: string
  private isCustom = false

  constructor(creatorId: string, creatorName: string) {
    this.creatorId = creatorId
    this.creatorName = creatorName
  }

  async show() {
    // Load user data
    this.currentUser = await getCurrentUser()

    if (!this.currentUser) {
      alert("Please log in to send sleep")
      return
    }

    // Create modal
    this.modal = document.createElement("div")
    this.modal.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 overflow-y-auto"
    this.modal.innerHTML = this.renderModal()

    document.body.appendChild(this.modal)

    // Add event listeners
    this.attachEventListeners()
  }

  private renderModal(): string {
    return `
      <div class="bg-white rounded-3xl w-full max-w-[740px] p-8 flex flex-col gap-8 my-auto max-h-[calc(100vh-2rem)]">
        <!-- Header -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <span class="text-4xl">🌙</span>
            <h2 class="text-3xl font-bold">Let Me Sleep</h2>
          </div>
          <p class="text-base" style="color: var(--neutral-600);">
            Your support helps ${this.creatorName} keep creating... and also helps them catch up on sleep.
          </p>
        </div>

        <!-- Sleep Balance -->
        <div class="rounded-2xl p-6 text-center" style="background: var(--blue-low-opacity);">
          <p class="text-base font-medium mb-2" style="color: var(--primary-blue);">Sleep Balance</p>
          <p class="text-4xl font-bold" style="color: var(--primary-blue);" id="sleep-balance">
            ${this.currentUser?.sleepBalance || 0}
          </p>
          <p class="text-xs mt-2" style="color: var(--neutral-600);">Available to give</p>
        </div>

        <!-- Tabs -->
        <div class="flex border-b" style="border-color: var(--neutral-200);">
          <button 
            class="flex-1 pb-3 text-base font-semibold transition-colors sleep-tab ${!this.isCustom ? "active" : ""}" 
            data-tab="packages"
            style="color: ${!this.isCustom ? "var(--primary-blue)" : "var(--neutral-400)"}; border-bottom: ${!this.isCustom ? "2px solid var(--primary-blue)" : "none"};"
          >
            Sleep Packages
          </button>
          <button 
            class="flex-1 pb-3 text-base font-semibold transition-colors sleep-tab ${this.isCustom ? "active" : ""}" 
            data-tab="custom"
            style="color: ${this.isCustom ? "var(--primary-blue)" : "var(--neutral-400)"}; border-bottom: ${this.isCustom ? "2px solid var(--primary-blue)" : "none"};"
          >
            Custom Sleep
          </button>
        </div>

        <!-- Content Container -->
        <div class="overflow-y-auto flex-1 min-h-0">
          <!-- Packages Tab -->
          <div class="sleep-tab-content ${!this.isCustom ? "" : "hidden"}">
            <h3 class="text-xl font-semibold mb-6">Choose Your Sleep Booster 😴</h3>
            <div class="grid grid-cols-3 gap-4">
              ${sleepPackages
                .map(
                  (pkg) => `
                <button 
                  class="sleep-package-btn flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${this.selectedAmount === pkg.amount ? "selected" : ""}"
                  data-amount="${pkg.amount}"
                  style="border-color: ${this.selectedAmount === pkg.amount ? "var(--primary-blue)" : "var(--neutral-200)"}; background: ${this.selectedAmount === pkg.amount ? "var(--blue-low-opacity)" : "white"};"
                >
                  <span class="text-3xl font-bold mb-2">${pkg.amount}</span>
                  <span class="text-sm" style="color: var(--neutral-700);">${pkg.label}</span>
                </button>
              `,
                )
                .join("")}
            </div>
          </div>

          <!-- Custom Tab -->
          <div class="sleep-tab-content ${this.isCustom ? "" : "hidden"}">
            <h3 class="text-xl font-semibold mb-4">Enter Custom Amount</h3>
            <input 
              type="number" 
              id="custom-amount" 
              class="w-full p-4 text-lg border-2 rounded-2xl focus:outline-none" 
              style="border-color: var(--neutral-200); focus:border-color: var(--primary-blue);"
              placeholder="Enter amount..."
              min="1"
              max="${this.currentUser?.sleepBalance || 0}"
              value="${this.isCustom ? this.selectedAmount : ""}"
            />
            <p class="text-xs mt-2" style="color: var(--neutral-600);">Max: ${this.currentUser?.sleepBalance || 0}</p>
          </div>

          <!-- Error/Success Message -->
          <div id="message" class="hidden text-sm p-3 rounded-lg mt-4"></div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 flex-shrink-0">
          <button class="btn-secondary flex-1" id="cancel-btn">
            Cancel
          </button>
          <button class="btn-main flex-1" id="send-sleep-btn">
            Send Sleep
          </button>
        </div>

        <!-- Footer -->
        <p class="text-sm text-center flex-shrink-0" style="color: var(--neutral-600);">
          💙 Thanks for giving ${this.creatorName} Sleep and strength to keep creating.
        </p>
      </div>
    `
  }

  private attachEventListeners() {
    if (!this.modal) return

    // Close on backdrop click
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) this.close()
    })

    // Cancel button
    this.modal.querySelector("#cancel-btn")?.addEventListener("click", () => this.close())

    // Tab switching
    this.modal.querySelectorAll(".sleep-tab").forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLElement
        const tabType = target.dataset.tab
        this.switchTab(tabType === "custom")
      })
    })

    // Package selection
    this.modal.querySelectorAll(".sleep-package-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLElement
        const amount = Number.parseInt(target.dataset.amount || "0")
        this.selectPackage(amount)
      })
    })

    // Custom amount input
    const customInput = this.modal.querySelector("#custom-amount") as HTMLInputElement
    customInput?.addEventListener("input", (e) => {
      const target = e.target as HTMLInputElement
      this.selectedAmount = Number.parseInt(target.value) || 0
    })

    // Send button
    this.modal.querySelector("#send-sleep-btn")?.addEventListener("click", () => this.handleSendSleep())
  }

  private switchTab(isCustom: boolean) {
    this.isCustom = isCustom
    if (!this.modal) return

    // Update tabs
    this.modal.querySelectorAll(".sleep-tab").forEach((tab) => {
      const target = tab as HTMLElement
      const isActive = (target.dataset.tab === "custom") === isCustom
      target.style.color = isActive ? "var(--primary-blue)" : "var(--neutral-400)"
      target.style.borderBottom = isActive ? "2px solid var(--primary-blue)" : "none"
    })

    // Update content
    this.modal.querySelectorAll(".sleep-tab-content").forEach((content, index) => {
      content.classList.toggle("hidden", index !== (isCustom ? 1 : 0))
    })

    // Reset selection
    if (isCustom) {
      this.selectedAmount = 0
    } else {
      this.selectedAmount = 3
      this.selectPackage(3)
    }
  }

  private selectPackage(amount: number) {
    this.selectedAmount = amount
    if (!this.modal) return

    // Update visual selection
    this.modal.querySelectorAll(".sleep-package-btn").forEach((btn) => {
      const target = btn as HTMLElement
      const btnAmount = Number.parseInt(target.dataset.amount || "0")
      const isSelected = btnAmount === amount

      target.style.borderColor = isSelected ? "var(--primary-blue)" : "var(--neutral-200)"
      target.style.background = isSelected ? "var(--blue-low-opacity)" : "white"
    })
  }

  private showMessage(message: string, isError = false) {
    const messageEl = this.modal?.querySelector("#message")
    if (messageEl) {
      messageEl.textContent = message
      messageEl.className = `text-sm p-3 rounded-lg ${isError ? "bg-red-50" : "bg-green-50"}`
      messageEl.className = isError ? "var(--red-main)" : "var(--success-main)"
      messageEl.classList.remove("hidden")
    }
  }

  private async handleSendSleep() {
    if (!this.currentUser) return

    // Validation
    if (this.selectedAmount <= 0) {
      this.showMessage("Please select or enter an amount", true)
      return
    }

    if (this.selectedAmount > this.currentUser.sleepBalance) {
      this.showMessage("Insufficient sleep balance", true)
      return
    }

    // Disable button
    const sendBtn = this.modal?.querySelector("#send-sleep-btn") as HTMLButtonElement
    if (sendBtn) {
      sendBtn.disabled = true
      sendBtn.textContent = "Sending..."
    }

    // Send sleep
    const result = await sendSleep(this.currentUser.id, this.creatorId, this.selectedAmount)

    if (result.success) {
      // Update balance display
      const balanceEl = this.modal?.querySelector("#sleep-balance")
      if (balanceEl && result.newBalance !== undefined) {
        balanceEl.textContent = result.newBalance.toString()
        this.currentUser.sleepBalance = result.newBalance
      }

      // Show success
      this.showMessage(`Successfully sent ${this.selectedAmount} sleep to ${this.creatorName}! 💙`)

      // Close after delay
      setTimeout(() => this.close(), 2000)
    } else {
      this.showMessage(result.error || "Failed to send sleep. Please try again.", true)
      if (sendBtn) {
        sendBtn.disabled = false
        sendBtn.textContent = "Send Sleep"
      }
    }
  }

  close() {
    if (this.modal) {
      document.body.removeChild(this.modal)
      this.modal = null
    }
  }
}
