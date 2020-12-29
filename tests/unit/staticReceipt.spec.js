import { mount } from "@vue/test-utils";
import Api from "@/components/Api";
import StaticReceipt from "@/components/StaticReceipt.vue";

jest.mock("@/components/Api");

describe("Static Receipt", () => {
  it("saves data from response to component", async () => {
    Api.get.mockImplementationOnce(() =>
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
