import { mount } from "@vue/test-utils";
import axios from "axios";
import StaticReceipt from "@/components/StaticReceipt.vue";

jest.mock("axios");

describe("Static Receipt", () => {
  it("saves data from response to component", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          id: 4,
          customer: {},
          issuer: "Coop",
          issuedAt: "2020",
          fileName: "receipt.png",
          entries: []
        }
      })
    );
    const receipt = await mount(StaticReceipt);
    expect(receipt.vm.id).toBe(4);
    expect(receipt.vm.customer).toStrictEqual({});
    expect(receipt.vm.issuer).toBe("Coop");
    expect(receipt.vm.issuedAt).toBe("2020");
    expect(receipt.vm.fileName).toBe("receipt.png");
    expect(receipt.vm.entries).toStrictEqual([]);
  });
});
